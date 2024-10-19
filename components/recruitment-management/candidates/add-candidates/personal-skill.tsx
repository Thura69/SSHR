import ModalNextBtns from '@/components/common/modal/modal-next-btns'
import CareerHistory from '@/components/employee/career/career-history'
import EducatioProfess from '@/components/employee/education/education-profess'
import LanguageProfess from '@/components/employee/education/language-profess'
import QualificationProfess from '@/components/employee/education/qualification-profess'
import { Referees } from '@/components/employee/referees/referees'
import SkillProfess from '@/components/employee/skill/skill-profession'
import useCandidateStore from '@/state/zustand/candidate'
import { useRouter } from 'next/navigation'

type PersonalSkillPageType = {
    detail?: boolean
}

const PersonalSkillPage: React.FC<PersonalSkillPageType> = ({ detail }) => {
    const { education, qualification, language, skillProfess, careerHistory } =
        useCandidateStore((state) => state)
    const router = useRouter()

    const handleSave = ({ data }: { data: object }) => {
        console.log(data)
    }

    const handleClick = () => {
        router.push('/recruitment/candidates')
    }

    return (
        <section className="w-full space-y-5">
            <EducatioProfess details={detail} isControled={true} />
            <QualificationProfess details={detail} isControled={true} />
            <LanguageProfess details={detail} isControled={true} />
            <SkillProfess details={detail} isControled={true} />
            <CareerHistory details={detail} isControled={true} />
            <Referees details={detail} isControled={true}/>
            <ModalNextBtns
                language="candidates"
                handleClick={() => handleSave}
                toggle={handleClick}
                width="w-[120px] mt-[20px]"
            />
        </section>
    )
}

export default PersonalSkillPage
