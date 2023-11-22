import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { tipCount, RESET_ALL } from '../redux/store/tipCount/tipCount-actions';

const AmountTips = () => {
    const dispatch = useDispatch();
    const { amountTip, amountTotal, totalTips, totalBill } = useSelector((state: tipCount) => state.tipCount);
    const handleResetAction = () => { dispatch({ type: RESET_ALL }); }

    return (
        <View style={styles.container}>
            <View style={styles.amount}>
                <Text style={styles.tipAmountTitle}>Tip Amount</Text>
                <Text style={styles.person}>/person</Text>
            </View>
            <View style={styles.amountTipContainer}>
                <Text style={styles.amountTip}>{isNaN(amountTip) ? '0' : amountTip}</Text>
            </View>
            <View style={styles.amount}>
                <Text style={styles.tipAmountTitle}>Tip Amount</Text>
                <Text style={styles.person}>/person</Text>
            </View>
            <View style={styles.amountTipContainer}>
                <Text style={styles.amountTip}>{isNaN(amountTip) ? '0' : amountTip}</Text>
            </View>
            <View style={styles.amount}>
                <Text style={styles.tipAmountTitle}>Total Tips</Text>
            </View>
            <View style={styles.amountTipContainer}>
                <Text style={styles.amountTip}>{isNaN(amountTip) ? '0' : amountTip}</Text>
            </View>
            <View style={styles.amount}>
                <Text style={styles.tipAmountTitle}>Total Bill</Text>
            </View>
            <View style={styles.amountTipContainer}>
                <Text style={styles.amountTip}>{isNaN(amountTip) ? '0' : amountTip}</Text>
            </View>
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
        paddingTop: 36,
        paddingLeft: 48,
        paddingRight: 42,
    },
    amount: {
        flex: 1,
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

    totalAmountTitle: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 2,
        color: '#fff',
    },

    person: {
        fontSize: 20,
        color: '#62797b',
        fontWeight: '700',
        letterSpacing: 2,
        marginTop: 12,
    },

    amountTipContainer: {
        flex: 1,
    },


    //    amountTotal
    amountTip: {
        textAlign: 'center',
        fontSize: 44,
        fontWeight: '700',
        color: '#2ac3ae',
    },


    // .btnReset {
    //     height: 72px;
    //     color: #00464e;
    //     font-size: 28px;
    //     font-weight: 700;
    //     background-color: #2ac3ae;
    //     border-radius: 10px;
    //     margin-top: 24px;

    // },
});