export interface DistinctDepartment {
    Department_ID: number
    Department_Name: string
}

export interface DistinctLocation {
    Location_ID: number
    Location_Name: string
}

export interface DistinctCompany {
    Company_ID: number
    Company_Name: string
}

export interface DistinctBranch {
    Branch_ID: number
    Branch_Name: string
}


export interface DistinctJobType {
    job_type_id: number
    job_type_name: string
}

export interface DistinctPosition {
    position_id: number
    position_name: string
}

export interface DistinctEmployee {
    employee_id: number
    employee_name: string
}

export interface DistinctTenant {
    tenant_id: number
    tenant_name: string
}

export interface TblHeadCountRequest {
    head_count_request_id: number;
    position_id: number;
    no_of_position: number;
    company_id: number;
    location_id: number;
    branch_id: number;
    department_id: number;
    section_id: number;
    job_location: string;
    job_type_id: number;
    additional_hard_skill_set: string[];
    additional_soft_skill_set: string[];
    urgency_level: string;
    /** Use string for DateTime, to be formatted appropriately */
    target_onboarding_date: string;
    reason: string;
    status: string;
    /** Use string for DateTime, to be formatted appropriately */
    created_date: string;
    /** Use string for DateTime, to be formatted appropriately */
    edited_date: string;
    created_by: number;
    edited_by: number;
    tenant_id: number;
    tbl_company?: DistinctCompany | undefined;
    tbl_department?: DistinctDepartment | undefined;
    tbl_branch?: DistinctBranch | undefined;
    tbl_location?: DistinctLocation | undefined;
    tbl_position?: DistinctPosition | undefined;
    tbl_job_type?: DistinctJobType | undefined;
    tbl_head_count_approval: TblHeadCountApproval[];
    approvers: ApprovalList[];
}

export interface TblHeadCountApproval {
    head_count_approval_id: number;
    head_count_request_id: number;
    position_id: number;
    department_id: number;
    branch_id: number;
    company_id: number;
    location_id: number;
    employee_id: number;
    status: string;
    /** Using string for date-time representation */
    approved_date: string;
    tbl_head_count_request: number;
    approve_reason: string;
    deny_reason: string;
    no_of_accepeted_position: number;
    order: number;
    tbl_company?: DistinctCompany | undefined;
    tbl_department?: DistinctDepartment | undefined;
    tbl_branch?: DistinctBranch | undefined;
    tbl_location?: DistinctLocation | undefined;
    tbl_position?: DistinctPosition | undefined;
    tbl_employee?: DistinctEmployee | undefined;
    tbl_tenant?: DistinctTenant | undefined;
}

export interface ApprovalList {
    approver_name: string;
    approve_reason: string;
    deny_reason: string;
    status: string;
    order: number;
    branch_name: string;
    company_name: string;
    department_name: string;
    position_name: string;
    section_name: string;
    location_name: string;
    employee_no: string;
    is_active: boolean;
    photo: string;
    no_of_accepeted_position: number;
}

export enum job_location_type {
    any,
    onsite,
    remote,
    hybrid
};

export interface HeadCount_Request_Create_Request {
    employee_id: number;
    requests: HeadCount_Request_Create_Payload[];
    tenant_id: number;
    user_id: number;
}

export interface HeadCountDataTable {
    position_id: number;
    position_name?: string | undefined;
    no_of_position: number;
    department_id: number;
    department_name?: string | undefined;
    branch_id: number;
    branch_name?: string | undefined;
    location_id: number;
    location_name?: string | undefined;
    company_id: number;
    company_name?: string | undefined;
    job_location: string;
    job_type_id: number;
    job_type_name?: string | undefined;
    additional_skill_set?: (string | undefined)[];
    urgency_level: string;
    target_onboarding_date: string;
    reason: string;
    section_id: number;
    section_name?: string | undefined;
}


export interface HeadCount_Request_Create_Payload {
    position_id: number;
    position_name?: string | undefined;
    no_of_position: number;
    department_id: number;
    department_name?: string | undefined;
    branch_id: number;
    branch_name?: string | undefined;
    location_id: number;
    location_name?: string | undefined;
    company_id: number;
    company_name?: string | undefined;
    job_location: string;
    job_type_id: number;
    job_type_name?: string | undefined;
    additional_skill_set?: (string | undefined)[];
    urgency_level: string;
    target_onboarding_date: string;
    reason: string;
    section_id: number;
    section_name?: string | undefined;
}
