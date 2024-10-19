import { Translation } from 'react-i18next'

const TableTitle = ({ title }: { title: string }) => {
    return (
        <h2 className="font-bold  text-primary-500 text-xl sm:text-2xl">
            {title}
        </h2>
    )
}

export default TableTitle
