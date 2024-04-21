// Status
export enum Status {
    Open = "Open",
    OnGoing = "On Going",
    Closed = "Closed"
}

export enum EmployeeStatus {
    Bench = "Bench",
    Billing = "Billing",
    Fired = "Fired"
}

export enum CandidateStatus {
    StandBy = "Stand By",
    Hired = "Hired"
}

export enum CandidateWorkStatus {
    Pipeline = "Pipeline",
    Employee = "Employee"
}

export enum AllocationStatus {
    Allocated = "Allocated",
    ClientInterview = "Client Interview",
    ClientFeedback = "Client Feedback"
}

export enum InterviewStatus {
    Scheduled = "Scheduled",
    Approved = "Approved",
    Rejected = "Rejected"
}

// Location
export enum Region {

    CDMX = "CDMX",
    HMO = "HMO",
    CUU = "CUU",
    MID = "MID",
    SLP = "SLP",

    CAMP = "CAMPINA",
    SAOPA = "SAO PAULO",

    COLOM = "COLOMBIA",
    PERU = "PERU",
    CR = "COSTA RICA",
    ARG = "ARGENTINA",
    DOM = "DOMINICANA",
    DLL = "DALLAS",
    PHX = "PHOENIX"
}

export enum Division {
    Mexico = "Encora Mexico",
    Brazil = "Encora Brazil",
    CSA = "Encora Central & South America",
    US = "Encora United States"
}


// Job Position
export enum Exclusivity {
    Committed = "Committed",
    NonCommitted = "NonCommitted",
  }
  
export enum DemandCuration {
    Strategic = "Strategic",
    Committed = "Committed",
    Open = "Open",
}

export enum PostingType {
    New_Headcount = "New_Headcount",
    Backfill = "Backfill",
    Replacement = "Replacement"
}


// General Information
export enum Gender {
    Male = "Male",
    Female = "Female"
}

//Others

export enum ReasonCurrentStatus{
    InTraining = "In training",
    Induction = "Induction/Orientation",
    Shadow = "Shadow resource",
    AwaitingClient = "Awaiting client confirmation/joining",
    Maternity = "Maternity leave",
    Sabbatical = "Sabbatical/Other leave",
    Intern = "Intern",
    MovedBilling = "Moved to billing",
    OtherRCS = "Other",
}

export enum ProposedAction{
    ProjectSearch = "Project search",
    InternProject = "Using in internal project",
    UpSkilling = "Upskilling/Cross training",
    Backup = "Backup/Shadow other projects",
    ResourcePool = "Resource pool",
    NoAction = "No action required",
    OtherPA = "Others",
    Attrition = "Attrition"
}