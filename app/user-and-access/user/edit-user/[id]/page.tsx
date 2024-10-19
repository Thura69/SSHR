import MainCom from './main'

export default function Page({ params }: { params: { id: string } }) {
    return <MainCom params={params} />
}
