import React from 'react';
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { tipCount, RESET_ALL } from '../redux/store/tipCount/tipCount-actions';


interface AmountTipsProps {
    onReset: () => void;
}

function AmountTips({ onReset }) {
    const dispatch = useDispatch();
    const { amountTip, amountTotal, totalTips, totalBill } = useSelector((state: tipCount) => state.tipCount);
    const handleResetAction = () => {
        onReset();
        dispatch({ type: RESET_ALL });
    }

    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                <View style={styles.amount}>
                    <Text style={styles.tipAmountTitle}>Tip Amount</Text>
                    <Text style={styles.person}>/person</Text>
                </View>
                <View style={styles.amountTipContainer}>
                    <Text style={styles.amountTip}>{isNaN(amountTip) ? '0' : amountTip}</Text>
                </View>
            </View>

            <View style={styles.amountContainer}>
                <View style={styles.amount}>
                    <Text style={styles.tipAmountTitle}>Total</Text>
                    <Text style={styles.person}>/person</Text>
                </View>
                <View style={styles.amountTipContainer}>
                    <Text style={styles.amountTip}>{isNaN(amountTotal) ? '0' : amountTotal}</Text>
                </View>
            </View>

            <View style={styles.amountContainer}>
                <View style={styles.amount}>
                    <Text style={styles.tipAmountTitle}>Total Tips</Text>
                </View>
                <View style={styles.amountTipContainer}>
                    <Text style={styles.amountTip}>{isNaN(totalTips) ? '0' : totalTips}</Text>
                </View>
            </View>

            <View style={styles.amountContainer}>
                <View style={styles.amount}>
                    <Text style={styles.tipAmountTitle}>Total Bill</Text>
                </View>
                <View style={styles.amountTipContainer}>
                    <Text style={styles.amountTip}>{isNaN(totalBill) ? '0' : totalBill}</Text>
                </View>
            </View>
            <Pressable style={styles.btnReset} onPress={handleResetAction}>
                <Text style={styles.btnResetText}>RESET</Text>
            </Pressable>
        </View >
    )
}

export default AmountTips;


const styles = StyleSheet.create({
    container: {
        height: 420,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#00464e',
        marginTop: 48,
        paddingTop: 24,
        paddingHorizontal: 18,
        marginBottom: 44,

    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
    },
    amount: {
        flex: 1,
        // width: 150,
        // flexDirection: 'row',
    },

    // tipContainer,
    totalContainer: {
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    // /* .totalContainer {
    //     padding-top: 36px;
    // } */

    tipAmountTitle: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#fff',
    },

    person: {
        flex: 1,
        fontSize: 16,
        color: '#62797b',
        fontWeight: '700',
        letterSpacing: 2,
        // marginTop: 12,
    },

    // totalAmountTitle: {
    //     fontSize: 20,
    //     fontWeight: '700',
    //     letterSpacing: 2,
    //     color: '#fff',
    // },


    amountTipContainer: {
        // flex: 1,
        justifyContent: 'space-between',
    },


    //    amountTotal
    amountTip: {
        width: 140,
        textAlign: 'right',
        fontSize: 36,
        fontWeight: '700',
        color: '#2ac3ae',
    },


    btnReset: {
        justifyContent: 'center',
        height: 72,
        backgroundColor: '#2ac3ae',
        borderRadius: 10,
        marginTop: 76,
    },

    btnResetText: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 28,
        color: '#00464e',
        fontWeight: '700',
    }
});