export class SellerModel {
    id: number;
    name: string;
    ddd: number;
    phone: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    document: string;
    birthday: Date;

    constructor(
        id?: number,
        name?: string,
        ddd?: number,
        phone?: number,
        address?: string,
        city?: string,
        state?: string,
        zipCode?: string,
        document?: string,
        birthday?: Date
    ) {
        this.id = id || 0;
        this.name = name || '';
        this.ddd = ddd || 0;
        this.phone = phone || 0;
        this.address = address || '';
        this.city = city || '';
        this.state = state || '';
        this.zipCode = zipCode || '';
        this.document = document || '';
        this.birthday = birthday || new Date();
    }
}
