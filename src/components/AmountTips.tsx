import React from 'react';
import { StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { tipCount, RESET_ALL } from '../redux/store/tipCount/tipCount-actions';

const AmountTips = () => {
    const dispatch = useDispatch();
    const { amountTip, amountTotal, totalTips, totalBill } = useSelector((state: tipCount) => state.tipCount);
    const handleResetAction = () => { dispatch({ type: RESET_ALL }); }

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
            {/* <button className={css.btnReset} onClick={handleResetAction}>RESET</button> */}
            <Pressable style={styles.btnReset} onPress={handleResetAction}>
                <Text style={styles.btnResetText}>RESET</Text>
            </Pressable>
        </View >
    )
}


// import { useDispatch, useSelector } from 'react-redux';
// import { RESET_ALL, tipCount } from '../store/tipCount/tipCount-actions';
// import css from './AmountTips.module.css';

// const AmountTips = () => {
//     const dispatch = useDispatch();

//     const { amountTip, amountTotal, totalTips, totalBill } = useSelector((state: tipCount) => state.tipCount);

//     const handleResetAction = () => { dispatch({ type: RESET_ALL }); }


//     return (
//         <div className={css.container}>
//             <div className={css.tipContainer}>
//                 <div className={css.amount}>
//                     <p className={css.tipAmountTitle}>Tip Amount<span className={css.person}> /person</span></p>
//                     {/* <p className={css.person}>/ person</p> */}
//                 </div>
//                 <p className={css.amountTip}>{isNaN(amountTip) ? '0' : amountTip}</p>
//             </div>

//             <div className={css.total}>
//                 <div className={css.totalContainer}>
//                     <div className={css.totalAmount}>
//                         <p className={css.totalAmountTitle}>Total<span className={css.person}> /person</span></p>
//                         {/* <p className={css.person}>/ person</p> */}
//                     </div>
//                     <p className={css.amountTotal}>{isNaN(amountTotal) ? '0' : amountTotal}</p>
//                 </div>
//             </div>
//             <div className={css.total}>
//                 <div className={css.totalContainer}>
//                     <div className={css.totalAmount}>
//                         <p className={css.totalAmountTitle}>Total Tips</p>
//                     </div>
//                     <p className={css.amountTotal}>{isNaN(totalTips) ? '0' : totalTips}</p>
//                 </div>
//             </div>
//             <div className={css.total}>
//                 <div className={css.totalContainer}>
//                     <div className={css.totalAmount}>
//                         <p className={css.totalAmountTitle}>Total Bill</p>
//                     </div>
//                     <p className={css.amountTotal}>{isNaN(totalBill) ? '0' : totalBill}</p>
//                 </div>
//             </div>
//             <button className={css.btnReset} onClick={handleResetAction}>RESET</button>
//         </div>
//     )
// }

// export default AmountTips

export default AmountTips;


const styles = StyleSheet.create({
    container: {
        height: 420,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#00464e',
        marginTop: 66,
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 30,
        marginBottom: 44,

    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
    },
    amount: {
        flex: 2,
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
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#fff',
    },

    person: {
        flex: 1,
        fontSize: 20,
        color: '#62797b',
        fontWeight: '700',
        letterSpacing: 2,
        // marginTop: 12,
    },

    totalAmountTitle: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#fff',
    },


    amountTipContainer: {
        flex: 1,
    },


    //    amountTotal
    amountTip: {
        textAlign: 'right',
        fontSize: 44,
        fontWeight: '700',
        color: '#2ac3ae',
    },


    btnReset: {
        justifyContent: 'center',
        height: 72,
        backgroundColor: '#2ac3ae',
        borderRadius: 10,
        marginTop: 24,
    },

    btnResetText: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 28,
        color: '#00464e',
        fontWeight: '700',
    }
});