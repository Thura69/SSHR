export const additionalData = [
    { label: 'Employee', value: 'Employee' },
    { label: 'Job Opening', value: 'Job Opening' },
    { label: 'Candidate', value: 'Candidate' },
];

export interface MyInterface {
    type: 'Employee' | 'Job Opening' | 'Candidate';
}

export type TypesType = 'Employee' | 'Job Opening' | 'Candidate';
