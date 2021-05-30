export class Task {
    id:          number;
    project:     Project;
    name:        string;
    description: string;
    alias:       string;
    advance:     number;
    creationDate: number;
    startDate:   number;
    finishDate:  number;
    updateDate:  number;
    time:        string;
    user:        User;
    deleted:     boolean;
}

export class Project {
    id:           number;
    name:         string;
    description:  string;
    alias:        string;
    state:        boolean;
    startDate:    number;
    finishDate:   number;
    user:         User;
    deleted:      boolean;
    creationDate: number;
    updateDate:   number;
}

export class User {
    id:           number;
    identityCard: string;
    name:         string;
    email:        string;
    password:     string;
    state:        boolean;
    deleted:      boolean;
    role:         string;
    creationDate: number;
    updateDate:   number;
}
