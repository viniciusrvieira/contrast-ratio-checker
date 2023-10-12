export interface IRgb {
    red: number
    green: number
    blue: number
}

export interface IWcagValidation extends Partial<ICustomValidation> {
    WCAG_AA: Boolean
    WCAG_AAA: Boolean
}

export interface ICustomValidation {
    CUSTOM: Boolean
}

export interface IValidationOptions {
    custom?: number | null
    fontSizePx?: number
    bold?: Boolean
}
