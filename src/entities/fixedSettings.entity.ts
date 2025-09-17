import type { Document } from 'mongodb';

export class FixedSetting extends Document {
    config_name: string;
    entries: {
        id: string;
        shown_value: string;
    }[];
}
