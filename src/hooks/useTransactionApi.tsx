import { useCallback, useState } from "react"
import transactionApi from "../api/transactionApi"
import Transaction from "../models/Transaction"

const useTransactionApi = () => {

    const [transaction, setTransaction] = useState<Transaction[]>([])
    
    const get_transaction = useCallback(
        async (userid:number) => {
            const result = await transactionApi.getTransaction(userid)
            setTransaction(result.data)
        }, [setTransaction]
    )

    const post_transaction = useCallback(
        async (newTran:Transaction) => {
            try{
                const result = await transactionApi.postTransaction(newTran)
                setTransaction(t => [...t, result.data])
            }catch(err){
                window.alert(err + "\nPlease choose date.");
            }

        }, [setTransaction]
    )

    const delete_transaction = useCallback(
        async (tranid:number) => {
            try{
                const result = await transactionApi.deleteTransaction(tranid)
                setTransaction(tr => tr.filter(t => {
                return t.transactionId !== result.data.transactionId
            }))
            }catch(err){
                window.alert(err + "\nPlease delete your all transaction detail before.");
            }
            
        }, [setTransaction]
    )

    return [transaction, get_transaction, post_transaction, delete_transaction] as const
}


export default useTransactionApi