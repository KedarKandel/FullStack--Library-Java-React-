import { TransactionType } from '../../interfaces/interface'

type Props = {
  transaction: TransactionType
}

const TransactionItem = ({ transaction }: Props) => {
  // Check if transaction has a bookCopy
  if (!transaction.bookCopy) {
    return null // Skip rendering this transaction if bookCopy is null
  }

  const isReturned = transaction.returned
  return (
    <tr>
      <td>{transaction.user.username}</td>
      <td>{transaction?.bookCopy.id}</td>
      <td>{new Date(transaction.borrowDate).toLocaleDateString()}</td>
      <td>{new Date(transaction.returnDate).toLocaleDateString()}</td>
      <td>{isReturned ? 'true' : 'false'}</td>
      <td>{transaction.returnedDate ? new Date(transaction.returnedDate).toLocaleDateString():"null"}</td>
    </tr>
  )
}

export default TransactionItem
