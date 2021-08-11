import { STATUS_CODES } from "http";
import fetch from "node-fetch";

export const ApiUri = "https://www.nbrb.by/api/";

export interface IGetCurrencyOptions {
  Cur_ID: number;
}

export interface IGetRatesOptions {
  ondate?: Date;
  periodicity?: 0 | 1;
}

export interface IGetRateOptions extends IGetRatesOptions {
  Cur_ID?: number;
  Cur_Code?: string;
  Cur_Abbreviation?: string;
}

export interface IGetDynamicsOptions {
  Cur_ID: number;
  startdate: Date;
  enddate: Date;
}

export interface ICurrency {
  Cur_ID: number;
  Cur_ParentID: number;
  Cur_Code: string;
  Cur_Abbreviation: string;
  Cur_Name: string;
  Cur_Name_Bel: string;
  Cur_Name_Eng: string;
  Cur_QuotName: string;
  Cur_QuotName_Bel: string;
  Cur_QuotName_Eng: string;
  Cur_NameMulti: string;
  Cur_Name_BelMulti: string;
  Cur_Name_EngMulti: string;
  Cur_Scale: number;
  Cur_Periodicity: number;
  Cur_DateStart: string;
  Cur_DateEnd: string;
}

export interface IBaseRate {
  Cur_ID: number;
  Date: string;
  Cur_OfficialRate: number;
}

export interface IRate extends IBaseRate {
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_Name: string;
}

export interface NBRBClientOptions {
  url?: URL | string;
}

export class NBRBClient {
  readonly #url: URL;

  public constructor({ url = ApiUri }: NBRBClientOptions = {}) {
    this.#url = new URL(url.toString());
  }

  public get url(): URL {
    return new URL(this.#url.toString());
  }

  public getCurrencies(): Promise<ICurrency[]> {
    return this.#fetch<ICurrency[]>("exrates/currencies");
  }

  public getCurrency({ Cur_ID }: IGetCurrencyOptions): Promise<ICurrency> {
    return this.#fetch<ICurrency>(`exrates/currencies/${Cur_ID}`);
  }

  public getRates({
    ondate = new Date(),
    periodicity = 0,
  }: IGetRatesOptions = {}): Promise<IRate[]> {
    return this.#fetch<IRate[]>(
      `exrates/rates?periodicity=${periodicity}&ondate=${ondate.toUTCString()}`
    );
  }

  public getRate(
    options: IGetRateOptions &
      ({ Cur_Abbreviation: string } | { Cur_Code: string } | { Cur_ID: number })
  ): Promise<IRate>;
  public getRate({
    ondate = new Date(),
    periodicity = 0,
    Cur_Abbreviation,
    Cur_ID,
    Cur_Code,
  }: IGetRateOptions = {}): Promise<IRate> {
    if (typeof Cur_ID !== "undefined") {
      return this.#fetch<IRate>(
        `exrates/rates/${Cur_ID}?parammode=0&periodicity=${periodicity}&ondate=${ondate.toUTCString()}`
      );
    } else if (typeof Cur_Abbreviation !== "undefined") {
      return this.#fetch<IRate>(
        `exrates/rates/${Cur_Abbreviation}?parammode=2&periodicity=${periodicity}&ondate=${ondate.toUTCString()}`
      );
    } else if (typeof Cur_Code !== "undefined") {
      return this.#fetch<IRate>(
        `exrates/rates/${Cur_Code}?parammode=1&periodicity=${periodicity}&ondate=${ondate.toUTCString()}`
      );
    }

    return Promise.reject(new TypeError("`Cur_ID` is missing"));
  }

  public getDynamics({
    enddate,
    startdate,
    Cur_ID,
  }: IGetDynamicsOptions): Promise<IBaseRate[]> {
    return this.#fetch<IBaseRate[]>(
      `exrates/rates/dynamics/${Cur_ID}?startdate=${startdate.toUTCString()}&enddate=${enddate.toUTCString()}`
    );
  }

  async #fetch<T = unknown>(path: string): Promise<T> {
    const response = await fetch(new URL(path, this.#url).toString());

    if (!response.ok) {
      throw new Error(STATUS_CODES[response.status]);
    }

    return response.json() as Promise<T>;
  }
}

export default NBRBClient;
