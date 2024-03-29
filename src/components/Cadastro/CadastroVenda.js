import { Delete } from "@mui/icons-material";
import { Autocomplete, Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { sum } from "lodash";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export default function NewSale({ control, itensArray, setItensArray, setValue }) {

    const [loading, setLoading] = useState(true)
    const [valor, setValor] = useState(' ')
    const [inputValue, setInputValue] = useState('')
    const [adress, setAdress] = useState('')
    const [city, setCity] = useState('')
    const [name, SetName] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [note, setNote] = useState('')
    const [quantity, setQuantity] = useState('')
    const [material, setMaterial] = useState('')
    const [pattern, setPattern] = useState('')
    const [color, setCode] = useState('')
    const [size, setSize] = useState('')
    const [finishing, setFinishing] = useState('')
    const [unitaryPrice, setUnitaryPrice] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [clientsArray, setClientsArray] = useState([])

    const disableArrowSx = {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
    }

    function handleDelete(idx) {
        const newItensArray = [...itensArray]
        newItensArray.splice(idx, 1)
        setItensArray(newItensArray)
    }

    function clearItemInput() {
        SetName('')
        setQuantity('')
        setMaterial('')
        setPattern('')
        setCode('')
        setSize('')
        setFinishing('')
        setUnitaryPrice('')
        setTotalPrice('')
    }

    function addItem() {
        const item = {
            name,
            quantity,
            material,
            pattern,
            color,
            size,
            finishing,
            unitaryPrice,
            totalPrice
        }
        setItensArray([...itensArray, item])
        clearItemInput()
    }

    const getClientsData = async () => {
        const clients = await axios.get('https://styloapi.vercel.app/clients/autoFill', {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        setClientsArray(clients.data)
        setLoading(false)
    }

    useEffect(() => {
        getClientsData()
    }, [])

    const updateCityAndAdress = (newValue) => {
        if (newValue) {
            setValue('cidade', newValue.cidade)
            setValue('endereco', newValue.endereco)
            setAdress(newValue.endereco)
            setCity(newValue.cidade)
        } else {
            setAdress('')
            setCity('')
        }
    }

    const updateTotalPrice = () => {
        if (unitaryPrice && quantity) {
            const totalPrice = quantity * unitaryPrice
            setTotalPrice(totalPrice)
        }
    }

    const orderTotal = () => {
        return sum(itensArray.map(item => parseFloat(item.totalPrice) || 0))
    }

    return (
        <div
            className="flex flex-col justify-evenly m-2 h-full"
        >
            <div className="h-full w-full flex flex-row justify-between mb-5">
                <Controller
                    render={({ field: { onChange, ...field } }) => (
                        <Autocomplete
                            {...field}
                            value={valor}
                            onChange={(_, newValue) => {
                                console.log(newValue)
                                newValue ? setValue('cliente', newValue.clientId) : setValue('cliente', null)
                                setValor(newValue)
                                updateCityAndAdress(newValue)
                            }}
                            inputValue={inputValue}
                            onInputChange={(_, newInputValue) => {
                                setInputValue(newInputValue)
                            }}
                            disablePortal
                            id="cliente"
                            options={clientsArray}
                            isOptionEqualToValue={(option, value) => option.razao_nome ? option.razao_nome + ' - ' + option.cnpj_cpf : '' === value}
                            getOptionLabel={client => client.razao_nome ? client.razao_nome + ' - ' + client.cnpj_cpf : ''}
                            renderInput={(params) => <TextField {...params} label="Cliente" />}
                            loading={loading}
                            fullWidth
                            required
                        />
                    )}
                    control={control}
                    name="cliente"
                    rules={{
                        required: true
                    }}
                />

            </div>
            <div
                className="h-full w-full flex flex-row justify-between"
            >
                <Controller
                    control={control}
                    name="cidade"
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="city"
                            className="w-3/12"
                            inputMode="text"
                            label="Cidade"
                            value={city}
                            onChange={e => {
                                setCity(e.target.value)
                                onChange(e)
                            }}
                            required
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="endereco"
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="adress"
                            className="w-8/12"
                            inputMode="text"
                            label="Endereço"
                            value={adress}
                            onChange={e => {
                                setAdress(e.target.value)
                                onChange(e)
                            }}
                            required
                        />
                    )}
                />
            </div>
            <div
                className="h-full w-full flex flex-row justify-between mt-5"
            >
                <Controller
                    control={control}
                    name="formapagamento"
                    rules={{
                        required: false
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="paymentmethod"
                            className="w-3/12"
                            inputMode="text"
                            label="Forma de Pagamento"
                            value={paymentMethod}
                            onChange={e => {
                                setPaymentMethod(e.target.value)
                                onChange(e)
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="observacao"
                    rules={{
                        required: false
                    }}
                    render={({ field: { onChange, ...field } }) => (
                        <TextField
                            {...field}
                            id="note"
                            className="w-8/12"
                            inputMode="text"
                            label="Observação"
                            value={note}
                            onChange={e => {
                                setNote(e.target.value)
                                onChange(e)
                            }}
                        />
                    )}
                />
            </div>
            <div className="h-full">
                <Divider
                    component={'div'}
                    color="white"
                    role="presentation"
                    className="w-full my-5"
                    textAlign="center"
                >
                    <Typography
                        fontSize={'20px'}
                        className="text-center w-full text-white"
                    >
                        Cadastro de Item
                    </Typography>
                </Divider>

                <div className="flex flex-wrap justify-center">
                    <TextField
                        label="Produto"
                        inputMode="text"
                        value={name}
                        onChange={e => {
                            SetName(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Quantidade"
                        type="number"
                        value={quantity}
                        onChange={e => {
                            setQuantity(e.target.value)
                        }}
                        onBlur={e => {
                            updateTotalPrice()
                        }}
                        className="m-5"
                        sx={disableArrowSx}
                    />
                    <TextField
                        label="Tecido"
                        inputMode="text"
                        value={material}
                        onChange={e => {
                            setMaterial(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Cor"
                        inputMode="text"
                        value={color}
                        onChange={e => {
                            setCode(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Desenho"
                        inputMode="text"
                        value={pattern}
                        onChange={e => {
                            setPattern(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Tamanho"
                        inputMode="text"
                        value={size}
                        onChange={e => {
                            setSize(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Acabamento"
                        inputMode="text"
                        value={finishing}
                        onChange={e => {
                            setFinishing(e.target.value)
                        }}
                        className="m-5"
                    />
                    <TextField
                        label="Preço Unitário"
                        type="number"
                        value={unitaryPrice}
                        onChange={e => {
                            setUnitaryPrice(e.target.value)
                        }}
                        onBlur={e => {
                            updateTotalPrice()
                        }}
                        className="m-5"
                        sx={disableArrowSx}
                    />
                    <TextField
                        label="Preço Total"
                        type="number"
                        value={totalPrice}
                        disabled
                        sx={disableArrowSx}
                        className="m-5"
                    />
                    <div className="w-full h-auto flex justify-end">
                        <Button
                            className="mr-12 border-red-600 text-gray-200"
                            variant="outlined"
                            onClick={clearItemInput}
                        >
                            Limpar Campos
                        </Button>
                        <Button
                            className="mr-12"
                            variant="outlined"
                            onClick={addItem}
                        >
                            Adicionar Item
                        </Button>
                    </div>
                </div>
            </div>
            {itensArray.length > 0 && (
                <div>
                    <Divider
                        component={'div'}
                        color="white"
                        role="presentation"
                        className="w-full my-5"
                        textAlign="center"
                    >
                        <Typography
                            fontSize={'20px'}
                            className="text-center text-white"
                        >
                            Itens
                        </Typography>
                    </Divider>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Produto</TableCell>
                                    <TableCell align="center">Quantidade</TableCell>
                                    <TableCell align="center">Tecido</TableCell>
                                    <TableCell align="center">Cor</TableCell>
                                    <TableCell align="center">Desenho</TableCell>
                                    <TableCell align="center">Tamanho</TableCell>
                                    <TableCell align="center">Acabamento</TableCell>
                                    <TableCell align="center">Preço Unitário</TableCell>
                                    <TableCell align="center">Preço Total</TableCell>
                                    <TableCell align="center" padding="none"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itensArray.map((row, idx) => (
                                    <TableRow
                                        key={idx + 1}
                                    >
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.quantity}</TableCell>
                                        <TableCell align="center">{row.material}</TableCell>
                                        <TableCell align="center">{row.color}</TableCell>
                                        <TableCell align="center">{row.pattern}</TableCell>
                                        <TableCell align="center">{row.size}</TableCell>
                                        <TableCell align="center">{row.finishing}</TableCell>
                                        <TableCell align="center">{row.unitaryPrice}</TableCell>
                                        <TableCell align="center">{row.totalPrice}</TableCell>
                                        <TableCell align="center" padding="none">
                                            <IconButton
                                                onClick={() => {
                                                    handleDelete(idx)
                                                }}
                                            >
                                                <Delete
                                                    className="text-red-700"
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow >
                                    <TableCell colSpan={9}></TableCell>
                                    <TableCell colSpan={1} align="right">Total do Pedido:</TableCell>
                                    <TableCell align="left">R$ {orderTotal()}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    )
}