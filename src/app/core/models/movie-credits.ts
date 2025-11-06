export interface MovieCredits {
    cast: Cast[];
}


export interface Cast {
    id:                   number;
    name:                 string;
    original_name:        string;
    profile_path:         null | string;
    character?:           string;
}
