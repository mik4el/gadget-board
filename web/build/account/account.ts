export class Account {
    constructor(
        public id?: number,
        public username?: string,
        public email?: string,
        public password?: string,
        public updated_at?: string,
        public created_at?: string
    ) { }
}