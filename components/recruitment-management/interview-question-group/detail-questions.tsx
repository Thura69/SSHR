import React from 'react'

const interviewQuestionData = [
    {
        id: 1,
        title: 'What is OOP?',
    },
    {
        id: 2,
        title: 'What is Scrum?',
    },
    {
        id: 3,
        title: 'Communication',
    },
    {
        id: 4,
        title: 'Teamwork',
    },
    {
        id: 5,
        title: 'Computing Skill',
    },
    {
        id: 6,
        title: 'Programming Language',
    },
]

export const DetailQuestions = () => {
    return (
        <div className='mb-5'>
            <div className="h-[51px] p-4 flex items-center justify-start font-bold bg-[#EEFDFD]">
                <h3 className="text-[#687588]">Questions</h3>
            </div>
          <div className='mt-[20px]'>
          {interviewQuestionData.map((e) => {
                return <div className='h-[45px] p-4 border-b flex items-center text-secondaryTextColor justify-start text-[14px]' key={e.id}>{e.title}</div>
            })}
          </div>
        </div>
    )
}
