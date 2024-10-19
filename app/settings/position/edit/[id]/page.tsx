import { notFound } from 'next/navigation'
import EditMain from './main'

const EditPage = ({ params }: { params: { id: string } }) => {
    const id = Number(params.id)

    if (!id) {
        notFound()
    }
    return (
        <div>
            <EditMain id={id} />
        </div>
    )
}

export default EditPage
