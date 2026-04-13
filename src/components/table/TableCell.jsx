<<<<<<< HEAD
export default function TableCell({children}) {
    return (
        <td className="m-0 p-2">
=======
export default function TableCell({ children, ...props }) {
    return (
        <td className="m-0 p-2" {...props}>
>>>>>>> bb0dfa2 (Added create and edit forms)
            {children}
        </td>
    )
}