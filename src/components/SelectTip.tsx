import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { SET_BILL_AMOUNT, SET_TIP_PERCENTAGE, SET_TIP_PERCENTAGE_CUSTOM, SET_NUMBER_OF_PEOPLE, SET_PERSONAL_TIP, SET_PERSONAL_AMOUNT, tipCount, SET_TOTAL_TIPS, SET_TOTAL_BILL } from '../redux/store/tipCount/tipCount-actions';
import AmountTips from './AmountTips';


const SelectTip = () => {
    const dispatch = useDispatch();
    const { tipPercentage, tipPercentageCustom, numberOfPeople } = useSelector((state: tipCount) => state.tipCount);
    const [billAmountString, setBillAmountString] = useState<string>('0')
    const billAmount: number = billAmountString !== '' ? parseFloat(billAmountString) : 0;

    const [isButtonPressed, setIsButtonPressed] = useState(false);

    // const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);

    function checkValue(value: string) {
        // console.log('Value is ...', value);
        setBillAmountString(handleDecimalsOnValue(value));
    }

    function handleDecimalsOnValue(value: string): string {

        const regex = /([0-9]*[\\.,]{0,1}[0-9]{0,2})/s;
        const match = value === undefined ? '' : value.replace(/,/g, ".").match(regex);

        if (match && match[0] !== null) {
            return match[0];
        } else {
            return "";
        }
    }


    const amountCheck = (value: string) => {
        const amount: string = handleDecimalsOnValue(value);

        if (amount === "") return -1;
        if (amount[amount.length - 1] === "." || amount[amount.length - 1] === ",") {
            return parseFloat(amount.slice(0, -1))
        }
        else {
            return parseFloat(amount);
        }
    }

    const handleReset = () => {
        setBillAmountString('0');
    };


    const handleBillAmountChange = (value: string) => {
        console.log('Value = ', value);

        // const amount = parseFloat(value);
        const amount: number = amountCheck(value);

        dispatch({ type: SET_BILL_AMOUNT, payload: isNaN(amount) ? 0 : billAmountString });
        calculatePersonalBill(amount, tipPercentage, tipPercentageCustom, numberOfPeople);
    };

    const handleTipPercentageChange = (percentage: number) => {
        dispatch({ type: SET_TIP_PERCENTAGE, payload: percentage });
        // setSelectedPercentage(percentage);
        calculatePersonalBill(billAmount, percentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageCustomChange = (value: string) => {
        const percCustom = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        // console.log(percCustom);

        dispatch({ type: SET_TIP_PERCENTAGE, payload: 0 });
        dispatch({ type: SET_TIP_PERCENTAGE_CUSTOM, payload: percCustom });
        // setSelectedPercentage(null);
        calculatePersonalBill(billAmount, percCustom, tipPercentageCustom, numberOfPeople)
    };

    const handleNumberOfPeopleChange = (value: string) => {
        const count = isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);

        dispatch({ type: SET_NUMBER_OF_PEOPLE, payload: count });
        calculatePersonalBill(billAmount, tipPercentage, tipPercentageCustom, count)

    };

    const calculatePersonalBill = (billAmount: number, tipPercentage: number, tipPercentageCustom: number, numberOfPeople: number) => {

        // const tipCustom: number = (tipPercentageCustom === 0) ? 0 : tipPercentageCustom;
        if (billAmount < 0) return;
        // if (tipPercentage > 0 || tipPercentageCustom > 0) {
        const selectedTipPercentage = tipPercentage > 0 ? tipPercentage : tipPercentageCustom;
        const selectedNumberOfPeople = numberOfPeople > 0 ? numberOfPeople : 1;
        const totalPersonalTip = (billAmount / selectedNumberOfPeople * selectedTipPercentage / 100).toFixed(2);
        const totalPersonalAmount = (billAmount / selectedNumberOfPeople * (1 + selectedTipPercentage / 100)).toFixed(2);
        const totalTips = (billAmount * selectedTipPercentage / 100).toFixed(2);
        const totalBill = (billAmount * (1 + selectedTipPercentage / 100)).toFixed(2);

        dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
        dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        dispatch({ type: SET_TOTAL_TIPS, payload: totalTips })
        dispatch({ type: SET_TOTAL_BILL, payload: totalBill })

        // } else if (tipPercentage === 0 && tipPercentageCustom === 0 && numberOfPeople === 0) {
        //     const totalPersonalTip = 0;
        //     const totalPersonalAmount = billAmount.toFixed(2);
        //     const totalTips = 0;
        //     const totalBill = (billAmount).toFixed(2);
        //     dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
        //     dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        //     dispatch({ type: SET_TOTAL_TIPS, payload: totalTips })
        //     dispatch({ type: SET_TOTAL_BILL, payload: totalBill })
        // } else if (tipPercentage === 0 && tipPercentageCustom === 0 && numberOfPeople > 0) {
        //     const totalPersonalTip = 0;
        //     const totalPersonalAmount = (billAmount / numberOfPeople).toFixed(2);
        //     const totalTips = 0;
        //     const totalBill = (billAmount).toFixed(2);
        //     dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
        //     dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        //     dispatch({ type: SET_TOTAL_TIPS, payload: totalTips })
        //     dispatch({ type: SET_TOTAL_BILL, payload: totalBill })
        // }

    }


    return (
        <View style={styles.actionContainer}>
            <View style={styles.inputPlaceContainer}>
                <Text style={styles.inputPlaceTitle}>Bill</Text>
                <TextInput style={styles.inputPlace}
                    placeholder={billAmount === 0 ? "0.00" : ""}
                    value={billAmount === 0 ? "" : billAmountString}
                    keyboardType="numeric"
                    maxLength={8}
                    onChangeText={checkValue}
                    onEndEditing={handleBillAmountChange}
                />
                <Text style={styles.dollar}>$</Text>
            </View>
            <Text style={styles.title}>Select Tip %</Text>
            <View style={styles.btnList}>
                {['5', '10', '15', '25', '50'].map((item: string) => (
                    <Pressable key={item}
                        // style={styles.btn}
                        onPress={() => {
                            handleTipPercentageChange(parseInt(item, 10));
                            setIsButtonPressed(true);
                        }}
                        onPressOut={() => {
                            setIsButtonPressed(false);
                        }}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed || (tipPercentage === parseInt(item, 10)) ? '#2ac3ae' : '#00464e',
                                color: pressed || isButtonPressed ? '#00464e' : '#fff',
                                // backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                            },
                            styles.btn,
                        ]}
                    >
                        {({ pressed }) => (
                            <Text style={styles.text}>{item}%</Text>
                        )}
                    </Pressable>
                ))}
                <View style={styles.customInputArea}>
                    <TextInput style={styles.customInput}
                        placeholder={tipPercentageCustom === 0 ? "Custom" : ""}
                        value={tipPercentageCustom === 0 ? "" : tipPercentageCustom + ''}
                        onChangeText={handleTipPercentageCustomChange}
                        maxLength={2}
                        keyboardType="numeric"
                    />
                    {tipPercentageCustom !== 0 && <Text style={styles.percentSign}>%</Text>}
                </View>
            </View>
            <View style={styles.countPeopleContainer}>
                <Text style={styles.countPeopleTitle}>Number of People</Text>
                <TextInput style={styles.countPeopleInput}
                    placeholder={numberOfPeople <= 0 ? "Enter a valid number" : ""}
                    value={numberOfPeople <= 0 ? "" : numberOfPeople.toString()}
                    onChangeText={handleNumberOfPeopleChange}
                    maxLength={4}
                    keyboardType="numeric" />
            </View>
            <AmountTips onReset={handleReset} />
        </View >
    )
}

export default SelectTip


const styles = StyleSheet.create({

    actionContainer: {
        flex: 1,
        width: '100%',
        // height: '90%',
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    inputPlaceContainer: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    inputPlaceTitle: {
        position: 'relative',
        flex: 1,
        width: '100 %',
        fontSize: 22,
        fontWeight: '700',
        color: '#62797b',
        paddingTop: 76,
        letterSpacing: 1.6,
    },

    inputPlace: {
        // inlineImageLeft='search_icon'   !!!
        height: 92,
        borderRadius: 10,
        color: '#00464e',
        fontSize: 34,
        textAlign: 'right',
        fontWeight: '700',
        backgroundColor: '#f3f8fb',
        marginTop: 24,
        paddingHorizontal: 16,
    },

    dollar: {
        position: 'absolute',
        top: 152,
        left: 16,
        fontSize: 34,
        fontWeight: '700',
        color: '#9fbebe',
    },

    title: {
        width: '100 %',
        textAlign: 'left',
        fontSize: 34,
        fontWeight: '700',
        letterSpacing: 1.6,
        color: '#62797b',
        marginTop: 78,
    },

    btnList: {
        flex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        rowGap: 24,
        columnGap: 24,
        paddingTop: 32,
    },

    btn: {
        fontSize: 36,
        fontWeight: '700',
        width: 168,
        height: 64,
        borderRadius: 8,
        // color: '#fff',
        // backgroundColor: '#00464e',
    },
    text: {
        height: '100 %',
        color: '#fff',
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 4,
    },
    // selected: {
    //     // btn: hover,
    //     // btn: focus,
    //     // btn: active 
    //     cursor: 'pointer',
    //     backgroundColor: '#2ac3ae',
    //     color: '#00464e',
    // },

    customInputArea: {
        flex: 1,
        width: 218,
        height: 64,
    },

    customInput: {
        textAlign: 'center',
        height: '100%',
        fontSize: 28,
        fontWeight: '700',
        borderRadius: 10,
        color: '#00464e',
        backgroundColor: '#f3f8fb',
        paddingHorizontal: 16,
    },

    percentSign: {
        position: 'absolute',
        fontSize: 28,
        fontWeight: '700',
        color: '#00464e',
        right: 40,
        top: 12,


    },

    countPeopleContainer: {
        flex: 1,
    },

    countPeopleTitle: {
        flex: 1,
        justifyContent: 'center',
        height: 34,
        width: '100 %',
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 1.6,
        color: '#62797b',
        marginTop: 36,
    },

    countPeopleInput: {
        flex: 2,
        height: 92,
        textAlign: 'right',
        borderRadius: 10,
        color: '#00464e',
        fontSize: 24,
        fontWeight: '700',
        backgroundColor: '#f3f8fb',
        marginTop: 18,
        paddingHorizontal: 16,
    }

});
