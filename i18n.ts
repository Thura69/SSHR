import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// Auth
import enAuth from './public/locales/en/auth.json'
import frAuth from './public/locales/fr/auth.json'
import jpAuth from './public/locales/jp/auth.json'
import mmAuth from './public/locales/mm/auth.json'

// User
import enUser from './public/locales/en/user.json'
import mmUser from './public/locales/mm/user.json'

// employment status
import enEmpStatus from '@/public/locales/en/emp-status.json'
import frEmpStatus from '@/public/locales/fr/emp-status.json'
import jpEmpStatus from '@/public/locales/jp/emp-status.json'
import mmEmpStatus from '@/public/locales/mm/emp-status.json'
import usePreferenceState from './state/zustand/preference'

//job TYpe
import enJobType from '@/public/locales/en/job-type.json'
import mmJobType from '@/public/locales/mm/job-type.json'

// Job Grade
import enJobGrade from '@/public/locales/en/job-grade.json'
import mmJobGrade from '@/public/locales/mm/job-grade.json'

// role
import enRoleList from '@/public/locales/en/role-list.json'
import enRoleCreate from '@/public/locales/en/role-create.json'
import enRoleEdit from '@/public/locales/en/role-edit.json'

import mmRoleList from '@/public/locales/mm/role-list.json'
import mmRoleCreate from '@/public/locales/mm/role-create.json'
import mmRoleEdit from '@/public/locales/mm/role-edit.json'

// Job category
import enJobCategory from '@/public/locales/en/job-category.json'
import mmJobCategory from '@/public/locales/mm/job-category.json'

// SubGrade
import enSubGrade from '@/public/locales/en/sub-grade.json'
import mmSubGrade from '@/public/locales/mm/sub-grade.json'

// Award Type
import enAwardType from '@/public/locales/en/award-type.json'
import mmAwardType from '@/public/locales/mm/award-type.json'
// Position
import enPosition from '@/public/locales/en/position.json'
import mmPosition from '@/public/locales/mm/position.json'
// Relationship
import enRelationship from '@/public/locales/en/relationship.json'
import mmRelationship from '@/public/locales/mm/relationship.json'

// common
import enCommon from '@/public/locales/en/common.json'
import mmCommon from '@/public/locales/mm/common.json'

//financial
import enFinancialYear from '@/public/locales/en/financial-year.json'
import mmFinancialYear from '@/public/locales/mm/financial-year.json'

//currency
import enCurrency from '@/public/locales/en/currency.json'
import mmCurrency from '@/public/locales/mm/currency.json'

//contract type
import enContractType from '@/public/locales/en/contract-type.json'
import mmContractType from '@/public/locales/mm/contract-type.json'

//vaccine
import enVaccine from '@/public/locales/en/vaccine.json'
import mmVaccine from '@/public/locales/mm/vaccine.json'

//vaccine type
import enVaccineType from '@/public/locales/en/vaccine-type.json'
import mmVaccineType from '@/public/locales/mm/vaccint-type.json'

//code generator
import enCodeGenerator from '@/public/locales/en/code-generator.json'
import mmCodeGenerator from '@/public/locales/mm/code-generator.json'

//public holiday
import enPublicHoliday from '@/public/locales/en/public-holiday.json'
import mmPublicHoliday from '@/public/locales/mm/public-holiday.json'

//device setup
import enDeviceSetup from '@/public/locales/en/device-setup.json'
import mmDeviceSetup from '@/public/locales/mm/device-setup.json'

//notification
import enNotificationAndAlert from '@/public/locales/en/notification-and-alert.json'
import mmNotificationAndAlert from '@/public/locales/mm/notification-and-alert.json'

//location
import enLocation from '@/public/locales/en/location.json'
import mmLocation from '@/public/locales/mm/location.json'

//department
import enDepartment from '@/public/locales/en/department.json'
import mmDepartment from '@/public/locales/mm/department.json'

//role-permissions
import enRolePermission from '@/public/locales/en/role-permission.json'
import mmRolePermission from '@/public/locales/mm/role-permission.json'

//emp-permissions
import enEmpPermission from '@/public/locales/en/emp-permission.json'
import mmEmpPermission from '@/public/locales/mm/emp-permission.json'

//section
import enSection from '@/public/locales/en/section.json'
import mmSection from '@/public/locales/mm/section.json'

//branch
import enBranch from '@/public/locales/en/branch.json'
import mmBranch from '@/public/locales/mm/branch.json'

//resign
import enResign from '@/public/locales/en/resign-reason.json'
import mmResign from '@/public/locales/mm/resign-reason.json'

//type of appointment
import enTypeOfAppointment from '@/public/locales/en/type-of-appointments.json'
import mmTypeOfAppointment from '@/public/locales/mm/type-of-appointment.json'

//employee information
import enEmployeeInformation from '@/public/locales/en/employee-information.json'
import mmEmployeeInformation from '@/public/locales/mm/employee-information.json'

//personal Details
import enPersonalDetail from '@/public/locales/en/personal-details.json'
import mmPersonalDetail from '@/public/locales/mm/personal-details.json'

//family Contact
import enFamilyContact from '@/public/locales/en/family.json'
import mmFamilyContact from '@/public/locales/mm/family.json'

//emergency Contact
import enEmergency from '@/public/locales/en/emergency.json'
import mmEmergency from '@/public/locales/mm/emergency.json'

//contract details
import mmContractDetail from '@/public/locales/mm/contractDetails.json'
import enContractDetail from '@/public/locales/en/contractDetails.json'

//job history
import mmJobHistory from '@/public/locales/mm/job-history.json'
import enJobHistory from '@/public/locales/en/job-history.json'

//biometric history
import mmBiometric from '@/public/locales/mm/biometric.json'
import enBiometric from '@/public/locales/en/biometric.json'

//device
import mmDevice from '@/public/locales/mm/device.json'
import enDevice from '@/public/locales/en/device.json'

//career
import mmCareer from '@/public/locales/mm/career.json'
import enCareer from '@/public/locales/en/career.json'

//education
import mmEducation from '@/public/locales/mm/education.json'
import enEducation from '@/public/locales/en/education.json'

//fileupload
import mmFileUpload from '@/public/locales/mm/file-upload.json'
import enFileUpload from '@/public/locales/en/file-upload.json'

//language
import mmLanguage from '@/public/locales/mm/language.json'
import enLanguage from '@/public/locales/en/language.json'

//hr concern
import mmHrConcern from '@/public/locales/mm/hrconcern.json'
import enHrConcern from '@/public/locales/en/hrconcern.json'

//award
import mmAward from '@/public/locales/mm/award.json'
import enAward from '@/public/locales/en/award.json'

//vaccine employee
import mmVaccineEmployee from '@/public/locales/mm/vaccine-employee.json'
import enVaccineEmployee from '@/public/locales/en/vaccine-employee.json'

//qualification
import mmQualification from '@/public/locales/mm/qualification.json'
import enQualification from '@/public/locales/en/qualification.json'

//skill
import mmSkill from '@/public/locales/mm/skill.json'
import enSkill from '@/public/locales/en/skill.json'

//summary
import mmSummary from '@/public/locales/mm/summary.json'
import enSummary from '@/public/locales/en/summary.json'

//employee
import mmEmployee from '@/public/locales/mm/employee.json'
import enEmployee from '@/public/locales/en/employee.json'

//skill-sets
import mmSkillSets from '@/public/locales/mm/skill-sets.json'
import enSkillSets from '@/public/locales/en/skill-sets.json'

//screening
import enScreenStage from '@/public/locales/en/screen-staging.json'
import mmScreenStage from '@/public/locales/mm/screen-staging.json'

//screening stage by position
import enScreeningStageByPosition from '@/public/locales/en/screening-stage-by-position.json'
import mmScreeningStageByPosition from '@/public/locales/mm/screening-stage-by-position.json'

//skill set by position
import enSkillSetByPosition from '@/public/locales/en/skill-set-by-position.json'
import mmSkillSetByPosition from '@/public/locales/mm/skill-set-by-position.json'

//hiring manager
import enHiringManager from '@/public/locales/en/hiring-manager.json'
import mmHiringManager from '@/public/locales/mm/hiring-manager.json'

//email template
import enEmailTemplate from '@/public/locales/en/email-template.json'
import mmEmailTemplate from '@/public/locales/mm/email-template.json'

//hiring source
import enHiringSource from '@/public/locales/en/hiring-source.json'
import mmHiringSource from '@/public/locales/mm/hiring-source.json'

//interview question
import enInterviewQuestionGroup from '@/public/locales/en/interview-question-group.json'
import mmInterviewQuestionGroup from '@/public/locales/mm/interview-question-group.json'

//head count request
import headCountRequest from '@/public/locales/en/head-count-request.json'
//head count approval
import headCountApproval from '@/public/locales/en/head-count-approval.json'

// head count history
import headCountHistory from '@/public/locales/en/head-count-history.json'
//candidate
import enCandidates from '@/public/locales/en/candidates.json'
import mmCandidates from '@/public/locales/mm/candidates.json'

//interview evaluation
import enInterviewEvaluation from '@/public/locales/en/interview-evaluation.json'
import mmInterviewEvaluation from '@/public/locales/mm/interview-evaluation.json'

//job opening
import enJobOpening from '@/public/locales/en/job-opening.json'
import mmJobOpening from '@/public/locales/mm/job-opening.json'

//referees
import enReferees from '@/public/locales/en/referees.json'
import mmReferees from '@/public/locales/mm/referees.json'

const resources = {
    en: {
        auth: enAuth,
        user: enUser,
        empStatus: enEmpStatus,
        employmentStatus: enEmpStatus,
        jobType: enJobType,
        common: enCommon,
        jobGrade: enJobGrade,
        roleList: enRoleList,
        roleCreate: enRoleCreate,
        roleEdit: enRoleEdit,
        jobCategory: enJobCategory,
        financialYear: enFinancialYear,
        currency: enCurrency,
        contractType: enContractType,
        vaccine: enVaccine,
        vaccineType: enVaccineType,
        subGrade: enSubGrade,
        awardType: enAwardType,
        position: enPosition,
        relationship: enRelationship,
        codeGenerator: enCodeGenerator,
        publicHoliday: enPublicHoliday,
        deviceSetup: enDeviceSetup,
        notificationAndAlert: enNotificationAndAlert,
        location: enLocation,
        department: enDepartment,
        rolePermission: enRolePermission,
        empPermission: enEmpPermission,
        section: enSection,
        branch: enBranch,
        resign: enResign,
        typeOfAppointment: enTypeOfAppointment,
        employeeInformation: enEmployeeInformation,
        personalDetail: enPersonalDetail,
        familyContact: enFamilyContact,
        contractDetailJobs: enContractDetail,
        jobHistoryJobs: enJobHistory,
        biometric: enBiometric,
        device: enDevice,
        career: enCareer,
        education: enEducation,
        fileUpload: enFileUpload,
        language: enLanguage,
        hrConcern: enHrConcern,
        award: enAward,
        vaccineEmployee: enVaccineEmployee,
        qualification: enQualification,
        skill: enSkill,
        summary: enSummary,
        employee: enEmployee,
        skillSet: enSkillSets,
        screenStaging: enScreenStage,
        screeningStageByPosition: enScreeningStageByPosition,
        skillSetByPosition: enSkillSetByPosition,
        hiringManager: enHiringManager,
        emailTemplate: enEmailTemplate,
        hiringSource: enHiringSource,
        interviewQuestionGroup: enInterviewQuestionGroup,
        headCountRequest: headCountRequest,
        headCountApproval: headCountApproval,
        emergencyContact: enEmergency,
        candidates: enCandidates,
        interviewEvaluation: enInterviewEvaluation,
        jobOpening: enJobOpening,
        referees: enReferees,
    },
    fr: {
        auth: frAuth,
        empStatus: frEmpStatus,
    },
    jp: {
        auth: jpAuth,
        empStatus: jpEmpStatus,
    },
    mm: {
        empStatus: mmEmpStatus,
        employmentStatus: mmEmpStatus,
        common: mmCommon,
        auth: mmAuth,
        jobType: mmJobType,
        jobGrade: mmJobGrade,
        roleList: mmRoleList,
        roleCreate: mmRoleCreate,
        roleEdit: mmRoleEdit,
        jobCategory: mmJobCategory,
        financialYear: mmFinancialYear,
        currency: mmCurrency,
        contractType: mmContractType,
        vaccine: mmVaccine,
        vaccineType: mmVaccineType,
        user: mmUser,
        subGrade: mmSubGrade,
        awardType: mmAwardType,
        relationship: mmRelationship,
        codeGenerator: mmCodeGenerator,
        publicHoliday: mmPublicHoliday,
        deviceSetup: mmDeviceSetup,
        notificationAndAlert: mmNotificationAndAlert,
        location: mmLocation,
        department: mmDepartment,
        position: mmPosition,
        rolePermission: mmRolePermission,
        empPermission: mmEmpPermission,
        section: mmSection,
        branch: mmBranch,
        resign: mmResign,
        typeOfAppointment: mmTypeOfAppointment,
        employeeInformation: mmEmployeeInformation,
        personalDetail: mmPersonalDetail,
        familyContact: mmFamilyContact,
        emergencyContact: mmEmergency,
        contractDetailJobs: mmContractDetail,
        jobHistoryJobs: mmJobHistory,
        biometric: mmBiometric,
        device: mmDevice,
        career: mmCareer,
        education: mmEducation,
        fileUpload: mmFileUpload,
        language: mmLanguage,
        hrConcern: mmHrConcern,
        award: mmAward,
        vaccineEmployee: mmVaccineEmployee,
        qualification: mmQualification,
        skill: mmSkill,
        summary: mmSummary,
        employee: mmEmployee,
        skillSet: mmSkillSets,
        screenStaging: mmScreenStage,
        screeningStageByPosition: mmScreeningStageByPosition,
        skillSetByPosition: mmSkillSetByPosition,
        hiringManager: mmHiringManager,
        emailTemplate: mmEmailTemplate,
        hiringSource: mmHiringSource,
        interviewQuestionGroup: mmInterviewQuestionGroup,
        candidates: mmCandidates,
        interviewEvaluation: mmInterviewEvaluation,
        jobOpening: mmJobOpening,
        referees: enReferees,
    },
}
const defaultLanguage = usePreferenceState.getState().selectedLanguage || 'en'

i18next
    // Remove the Backend plugin since you're importing files directly
    .use(initReactI18next) // Pass the i18n instance to react-i18next
    .init({
        resources: resources,
        lng: defaultLanguage, // Default language
        fallbackLng: defaultLanguage,
        interpolation: {
            escapeValue: false, // Not needed for React
        },
        // Enable debugging
        debug: true,
    })

export default i18next
