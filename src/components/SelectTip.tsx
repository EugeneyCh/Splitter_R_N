import React, { useState } from 'react';
import { Button, ScrollView, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { SET_BILL_AMOUNT, SET_TIP_PERCENTAGE, SET_TIP_PERCENTAGE_CUSTOM, SET_NUMBER_OF_PEOPLE, SET_PERSONAL_TIP, SET_PERSONAL_AMOUNT, tipCount } from '../redux/store/tipCount/tipCount-actions';


const SelectTip = () => {

    const dispatch = useDispatch();
    const { billAmount, tipPercentage, tipPercentageCustom, numberOfPeople } = useSelector((state: tipCount) => state.tipCount);

    const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);

    const handleBillAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(event.target.value);
        dispatch({ type: SET_BILL_AMOUNT, payload: isNaN(amount) ? 0 : amount });
        calculatePersonalBill(amount, tipPercentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageChange = (percentage: number) => {
        dispatch({ type: SET_TIP_PERCENTAGE, payload: percentage });
        setSelectedPercentage(percentage);
        calculatePersonalBill(billAmount, percentage, tipPercentageCustom, numberOfPeople)
    };

    const handleTipPercentageCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const percCustom = parseFloat(event.target.value);
        dispatch({ type: SET_TIP_PERCENTAGE_CUSTOM, payload: isNaN(percCustom) ? 0 : percCustom });
        setSelectedPercentage(null);
        calculatePersonalBill(billAmount, percCustom, tipPercentageCustom, numberOfPeople)
    };

    const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value, 10);
        if (count < 0 || isNaN(count)) {
            alert("Number of people must be a positive integer");
            return;
        }
        dispatch({ type: SET_NUMBER_OF_PEOPLE, payload: isNaN(count) ? 0 : count });
        calculatePersonalBill(billAmount, tipPercentage, tipPercentageCustom, count)

    };

    const calculatePersonalBill = (billAmount: number, tipPercentage: number, tipPercentageCustom: number, numberOfPeople: number) => {
        if (billAmount <= 0) return;
        if ((tipPercentage > 0 || tipPercentageCustom > 0) && numberOfPeople >= 1) {
            const selectedTipPercentage = tipPercentage > 0 ? tipPercentage : tipPercentageCustom;
            const totalPersonalTip = (billAmount / numberOfPeople * selectedTipPercentage / 100).toFixed(2);
            const totalPersonalAmount = (billAmount / numberOfPeople * (1 + selectedTipPercentage / 100)).toFixed(2);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        } else if (tipPercentage === 0 && tipPercentageCustom === 0 && numberOfPeople > 0) {
            const totalPersonalTip = 0;
            const totalPersonalAmount = (billAmount / numberOfPeople).toFixed(2);
            dispatch({ type: SET_PERSONAL_TIP, payload: totalPersonalTip })
            dispatch({ type: SET_PERSONAL_AMOUNT, payload: totalPersonalAmount })
        }


    }


    return (
        <ScrollView style={styles.actionContainer}>
            <View style={styles.inputPlaceContainer}>
                <Text style={styles.inputPlaceTitle}>Bill</Text>
                <TextInput style={styles.inputPlace}
                    placeholder={billAmount === 0 ? "0.00" : ""}
                    value={billAmount === 0 ? "" : billAmount + ""}
                    keyboardType="numeric"
                // onChangeText={handleBillAmountChange}
                />
                <Text style={styles.dollar}>$</Text>
            </View>
            <Text style={styles.title}>Select Tip %</Text>
            <View style={styles.btnList}>
                {['5', '10', '15', '25', '50'].map((item: string) => (
                    <Pressable
                        onPress={() => {
                            handleTipPercentageChange(parseInt(item, 10));
                        }}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#2ac3ae' : '#00464e',
                                color: '#00464e',
                                // backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                            },
                            styles.btn,
                        ]}>
                        {({ pressed }) => (
                            <Text style={styles.text}>{item}%</Text>
                        )}
                    </Pressable>
                    // <Button style={`${styles.btn} ${selectedPercentage === parseInt(item, 10) ? styles.selected : ''}`}
                    // <Button
                    //     style={styles.btn}
                    //     key={item}
                    //     onClick={() => handleTipPercentageChange(parseInt(item, 10))}
                    //     title={item}
                    // />
                ))}

            </View>
        </ScrollView>
    )
}

// {/* <label style={styles.inputPlaceTitle}>
//                 Bill
//                 <input
//                     type="number"
//                     name="sum"
//                     placeholder={billAmount === 0 ? "0.00" : ""}
//                     style={styles.inputPlace}
//                     value={billAmount === 0 ? "" : billAmount}
//                     onChange={handleBillAmountChange}
//                 />
//                 <p style={styles.dollar}>$</p>
//             </label> */}

// {/* <p style={styles.title}>Select Tip %</p> */ }
// {/* <ul style={styles.btnList}>
// {['5', '10', '15', '25', '50'].map((item: string) => (
//     <li style={`${styles.btn} ${selectedPercentage === parseInt(item, 10) ? styles.selected : ''}`} key={item} onClick={() => handleTipPercentageChange(parseInt(item, 10))}>
//         {item}%
//     </li>
// ))}
//                 <li style={styles.customInputArea}>
//                     <input type="number"
//                         style={`${styles.customInput} ${tipPercentageCustom !== 0 ? styles.customInputselected : ''}`}
//                         placeholder={tipPercentageCustom === 0 ? "Custom" : "0"}
//                         value={tipPercentageCustom === 0 ? "" : tipPercentageCustom}
//                         onChange={handleTipPercentageCustomChange}

//                     />
//                 </li>
//             </ul> */}

// {/* <label style={styles.countPeopleTitle}>
//                 Number of People
//                 <input
//                     type="number"
//                     name="count"
//                     placeholder={numberOfPeople <= 0 ? "Enter a valid number" : ""}
//                     style={styles.countPeopleInput}
//                     value={numberOfPeople <= 0 ? "" : numberOfPeople.toString()}
//                     onChange={handleNumberOfPeopleChange}
//                 />
//             </label> */}

export default SelectTip


const styles = StyleSheet.create({
    actionContainer: {
        flex: 1,
        width: '100%',
        // height: '90%',
        backgroundColor: '#fff',
        paddingHorizontal: 38,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,


    },

    inputPlaceContainer: {
        // position: 'relative',
        flex: 1,
        justifyContent: 'flex-start',
        // marginTop: 76,

    },
    inputPlaceTitle: {
        position: 'relative',
        // flex: 1,
        // justifyContent: 'flex-start',
        // height: 142,
        width: '100 %',
        fontSize: 22,
        fontWeight: '700',
        color: ' #62797b',
        paddingTop: 76,
        letterSpacing: 1.6,
    },

    inputPlace: {
        // inlineImageLeft='search_icon'   !!!
        height: 92,
        maxLength: 8,
        // textAlign: 'center',
        borderRadius: 10,
        // border: 'none',
        // color: '#00464e',
        fontSize: 34,
        textAlign: 'right',
        // fontWeight: 700,
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
        color: '#62797b',
        marginTop: 78,
    },

    btnList: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'aliceblue',
        maxHeight: 150,
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        rowGap: 36,
        columnGap: 36,
        paddingTop: 32,
    },

    btn: {
        // flex: 0.5,
        // justify  content: center,
        // align  items: center,
        fontSize: 36,
        fontWeight: '700',
        width: 148,
        height: 64,
        borderRadius: 8,
        color: ' #fff',
        backgroundColor: '#00464e',
    },
    text: {
        height: '100 %',
        color: '#fff',
        fontSize: 36,
        textAlign: 'center',
        paddingTop: 4,
    },
    selected: {
        // btn: hover,
        // btn: focus,
        // btn: active 
        cursor: 'pointer',
        backgroundColor: '#2ac3ae',
        color: '#00464e',
    },

    // customInputArea: {
    //         width: 218px,
    //         height: 96px,
    //     }

    // customInput: {
    //         text  align: end,
    //         height: inherit,
    //         width: inherit,
    //         font  size: 36px,
    //         font  weight: 700,
    //         border: none,
    //         border  radius: 10px,
    //         color: #62797b,
    //         background  color: #f3f8fb,
    //         padding: 0px 36px,
    //     }

    // customInputselected: {
    //         border: 2px solid #62797b,
    //     }

    // customInput:: placeholder: {
    //         text  align: center,
    //     }

    //         /* .btn,
    //         .btn:last-child {
    //             display: flex,
    //             justify-content: center;
    //             align-items: center;
    //             font-size: 36px;
    //             font-weight: 700;
    //             width: 290px;
    //             height: 96px;
    //             border-radius: 10px;
    //             color: #fff;
    //             background-color: #00464e;
    //         } */
    //         .selected,
    //     .btn: hover,
    //     .btn: focus,
    //     .btn: active {
    //     cursor: pointer;
    //     background - color: #2ac3ae;
    // color: #00464e;
    // }

    //     /* .btn:last-child {
    //         color: #62797b;
    //         background-color: #f3f8fb;
    //     } */

    //     .countPeopleTitle {
    //     position: relative;
    //     display: flex;
    //     flex - direction: column;
    //     justify - content: flex - start;
    //     height: 142px;
    //     width: 100 %;
    //     font - size: 22px;
    //     color: #62797b;
    //     margin - top: 76px;
    // }

    //     .countPeopleInput {
    //     height: 92px;
    //     text - align: end;
    //     border - radius: 10px;
    //     border: none;
    //     color: #00464e;
    //     font - size: 34px;
    //     font - weight: 700;
    //     background - color: #f3f8fb;
    //     margin - top: 24px;
    //     padding: 0px 38px;
    // }

    // input[type = "number"]:: -webkit - outer - spin - button,
    //     input[type = "number"]:: -webkit - inner - spin - button {
    //     -webkit - appearance: none;
    // }

    // input[type = "number"]: focus,
    //     input[type = "number"]:hover {
    //     border - color: #2ac3ae;
    // }


    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    },
    logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9',
    },

});
