import { menuTypes } from '@/types/setting'


export const menuMapObj = {
    employmentStatus: {
        endpoint: 'employment-statues',
        fields: {
            name: 'Employment_Status_Name',
            description: 'Descriptions',
            isActive: 'IsActive',
            id: 'Employment_Status_ID',
        },
    },
    jobCategory: {
        endpoint: 'job-categories',
        fields: {
            name: 'job_category_name',
            description: 'description',
            isActive: 'is_active',
            id: 'job_category_id',
        },
    },

    jobGrade: {
        endpoint: 'job-grades',
        fields: {
            name: 'job_grade_name',
            description: 'description',
            isActive: 'is_active',
            id: 'job_grade_id',
        },
    },

    jobType: {
        endpoint: 'job-types',
        fields: {
            name: 'job_type_name',
            description: 'description',
            isActive: 'is_active',
            id: 'job_type_id',
        },
    },
    subGrade: {
        endpoint: 'sub-grades',
        fields: {
            name: 'sub_grade_name',
            description: 'description',
            isActive: 'is_active',
            id: 'sub_grade_id',
        },
    },
    awardType: {
        endpoint: 'award-types',
        fields: {
            name: 'award_type_name',
            description: 'description',
            isActive: 'is_active',
            id: 'award_type_id',
        },
    },
    relationship: {
        endpoint: 'relationships',
        fields: {
            name: 'relationship_name',
            description: 'description',
            isActive: 'is_active',
            id: 'relationship_id',
        },
    },
    vaccineType: {
        endpoint: 'vaccine-types',
        fields: {
            name: 'vaccine_type_name',
            description: 'description',
            isActive: 'is_active',
            id: 'vaccine_type_id',
        },
    },
    contractType: {
        endpoint: 'contract-types',
        fields: {
            name: 'contract_name',
            description: 'description',
            isActive: 'is_active',
            id: 'contract_id',
        },
    },
    location: {
        endpoint: 'locations',
        fields: {
            name: 'location_name',
            description: 'description',
            isActive: 'is_active',
            id: 'location_id',
        },
    },
    resign: {
        endpoint: 'resign-reasons',
        fields: {
            name: 'resign_type_name',
            description: 'description',
            isActive: 'is_active',
            id: 'resign_type_id',
        },
    },
    typeOfAppointment: {
        endpoint: 'typeof-appointments',
        fields: {
            name: 'type_of_appointment',
            description: 'description',
            isActive: 'is_active',
            id: 'appointment_type_id',
        }
    }

}


export const urlMapObj: Record<string, menuTypes> = {
    'settings/employment-status': 'employmentStatus',
    'settings/job-type': 'jobType',
    'settings/job-category': 'jobCategory',
    'settings/job-grade': 'jobGrade',
    'settings/sub-grade': 'subGrade',
    'settings/award-type': 'awardType',
    'settings/relationship': 'relationship',
    'settings/vaccine-type': 'vaccineType',
    'settings/contract-type': 'contractType',
    'settings/resign-reason': 'resign',
    'settings/type-of-appointment': 'typeOfAppointment',
    'organisation-structure/location': 'location',
}
