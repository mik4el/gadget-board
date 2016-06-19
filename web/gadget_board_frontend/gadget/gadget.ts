export class Gadget {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public users_can_upload?: string[],
        public updated_at?: string,
        public created_at?: string
    ) { }
}