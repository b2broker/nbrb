import { deepStrictEqual, rejects } from "assert";
import { STATUS_CODES } from "http";
import nock from "nock";
import { NBRBClient, ICurrency, IBaseRate, IRate } from "../index.js";

const url = "https://some.example.com/api/";

const client = new NBRBClient({ url });

suite("PublicClient", () => {
  test("constructor", () => {
    deepStrictEqual(client.url, new URL(url));
  });

  test(".getCurrencies() (throws an error on unsuccessful requests)", async () => {
    const status = 404;
    nock(url).get("/exrates/currencies").reply(status);

    await rejects(
      () => client.getCurrencies(),
      new Error(STATUS_CODES[status])
    );
  });

  test(".getCurrencies()", async () => {
    const response = [
      {
        Cur_ID: 157,
        Cur_ParentID: 271,
        Cur_Code: "932",
        Cur_Abbreviation: "AZM",
        Cur_Name: "Азербайджанский манат",
        Cur_Name_Bel: "Азербайджанскі манат",
        Cur_Name_Eng: "Azerbaijanian Manat",
        Cur_QuotName: "1000 азербайджанских манат",
        Cur_QuotName_Bel: "1000 азербайджанскіх манатаў",
        Cur_QuotName_Eng: "1000 Azerbaijanian Manats",
        Cur_NameMulti: "азербайджанских манат",
        Cur_Name_BelMulti: "азербайджанскіх манатаў",
        Cur_Name_EngMulti: "Azerbaijanian Manats",
        Cur_Scale: 1000,
        Cur_Periodicity: 1,
        Cur_DateStart: "1996-01-31T00:00:00",
        Cur_DateEnd: "2002-12-31T00:00:00",
      },
      {
        Cur_ID: 166,
        Cur_ParentID: 166,
        Cur_Code: "960",
        Cur_Abbreviation: "XDR",
        Cur_Name: "СДР ",
        Cur_Name_Bel: "Адзінка СПП (SDR) ад МВФ",
        Cur_Name_Eng: "SDR",
        Cur_QuotName: "1 СДР ",
        Cur_QuotName_Bel: "1 Адзінка СПП (SDR) ад МВФ",
        Cur_QuotName_Eng: "1 SDR",
        Cur_NameMulti: "",
        Cur_Name_BelMulti: "",
        Cur_Name_EngMulti: "",
        Cur_Scale: 1,
        Cur_Periodicity: 0,
        Cur_DateStart: "1991-01-01T00:00:00",
        Cur_DateEnd: "2013-05-31T00:00:00",
      },
      {
        Cur_ID: 169,
        Cur_ParentID: 169,
        Cur_Code: "980",
        Cur_Abbreviation: "UAH",
        Cur_Name: "Украинская гривна",
        Cur_Name_Bel: "Украінская грыўня",
        Cur_Name_Eng: "Hryvnia",
        Cur_QuotName: "1 Украинская гривна",
        Cur_QuotName_Bel: "1 Украінская грыўня",
        Cur_QuotName_Eng: "1 Hryvnia",
        Cur_NameMulti: "",
        Cur_Name_BelMulti: "",
        Cur_Name_EngMulti: "",
        Cur_Scale: 1,
        Cur_Periodicity: 0,
        Cur_DateStart: "1996-11-01T00:00:00",
        Cur_DateEnd: "2007-11-30T00:00:00",
      },
    ] as ICurrency[];
    nock(url).get("/exrates/currencies").reply(200, response);

    const data = await client.getCurrencies();
    deepStrictEqual(data, response);
  });

  test(".getCurrency()", async () => {
    const response = {
      Cur_ID: 166,
      Cur_ParentID: 166,
      Cur_Code: "960",
      Cur_Abbreviation: "XDR",
      Cur_Name: "СДР ",
      Cur_Name_Bel: "Адзінка СПП (SDR) ад МВФ",
      Cur_Name_Eng: "SDR",
      Cur_QuotName: "1 СДР ",
      Cur_QuotName_Bel: "1 Адзінка СПП (SDR) ад МВФ",
      Cur_QuotName_Eng: "1 SDR",
      Cur_NameMulti: "",
      Cur_Name_BelMulti: "",
      Cur_Name_EngMulti: "",
      Cur_Scale: 1,
      Cur_Periodicity: 0,
      Cur_DateStart: "1991-01-01T00:00:00",
      Cur_DateEnd: "2013-05-31T00:00:00",
    } as ICurrency;
    const Cur_ID = 431;
    nock(url).get(`/exrates/currencies/${Cur_ID}`).reply(200, response);

    const data = await client.getCurrency({ Cur_ID });
    deepStrictEqual(data, response);
  });

  test(".getRates()", async () => {
    const response = [
      {
        Cur_ID: 440,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "AUD",
        Cur_Scale: 1,
        Cur_Name: "Австралийский доллар",
        Cur_OfficialRate: 1.8494,
      },
      {
        Cur_ID: 510,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "AMD",
        Cur_Scale: 1000,
        Cur_Name: "Армянских драмов",
        Cur_OfficialRate: 5.1114,
      },
      {
        Cur_ID: 441,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "BGN",
        Cur_Scale: 1,
        Cur_Name: "Болгарский лев",
        Cur_OfficialRate: 1.5135,
      },
      {
        Cur_ID: 449,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "UAH",
        Cur_Scale: 100,
        Cur_Name: "Гривен",
        Cur_OfficialRate: 9.3874,
      },
      {
        Cur_ID: 450,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "DKK",
        Cur_Scale: 10,
        Cur_Name: "Датских крон",
        Cur_OfficialRate: 3.9803,
      },
      {
        Cur_ID: 431,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "USD",
        Cur_Scale: 1,
        Cur_Name: "Доллар США",
        Cur_OfficialRate: 2.5166,
      },
      {
        Cur_ID: 451,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "EUR",
        Cur_Scale: 1,
        Cur_Name: "Евро",
        Cur_OfficialRate: 2.9613,
      },
      {
        Cur_ID: 452,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "PLN",
        Cur_Scale: 10,
        Cur_Name: "Злотых",
        Cur_OfficialRate: 6.481,
      },
      {
        Cur_ID: 508,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "JPY",
        Cur_Scale: 100,
        Cur_Name: "Иен",
        Cur_OfficialRate: 2.2852,
      },
      {
        Cur_ID: 461,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "IRR",
        Cur_Scale: 100000,
        Cur_Name: "Иранских риалов",
        Cur_OfficialRate: 5.9919,
      },
      {
        Cur_ID: 453,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "ISK",
        Cur_Scale: 100,
        Cur_Name: "Исландских крон",
        Cur_OfficialRate: 2.0002,
      },
      {
        Cur_ID: 371,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "CAD",
        Cur_Scale: 1,
        Cur_Name: "Канадский доллар",
        Cur_OfficialRate: 2.0068,
      },
      {
        Cur_ID: 462,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "CNY",
        Cur_Scale: 10,
        Cur_Name: "Китайских юаней",
        Cur_OfficialRate: 3.8851,
      },
      {
        Cur_ID: 394,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "KWD",
        Cur_Scale: 1,
        Cur_Name: "Кувейтский динар",
        Cur_OfficialRate: 8.3666,
      },
      {
        Cur_ID: 454,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "MDL",
        Cur_Scale: 10,
        Cur_Name: "Молдавских леев",
        Cur_OfficialRate: 1.4126,
      },
      {
        Cur_ID: 448,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "NZD",
        Cur_Scale: 1,
        Cur_Name: "Новозеландский доллар",
        Cur_OfficialRate: 1.7654,
      },
      {
        Cur_ID: 455,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "NOK",
        Cur_Scale: 10,
        Cur_Name: "Норвежских крон",
        Cur_OfficialRate: 2.825,
      },
      {
        Cur_ID: 456,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "RUB",
        Cur_Scale: 100,
        Cur_Name: "Российских рублей",
        Cur_OfficialRate: 3.4244,
      },
      {
        Cur_ID: 457,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "XDR",
        Cur_Scale: 1,
        Cur_Name: "СДР (Специальные права заимствования)",
        Cur_OfficialRate: 3.5843,
      },
      {
        Cur_ID: 421,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "SGD",
        Cur_Scale: 1,
        Cur_Name: "Сингапурcкий доллар",
        Cur_OfficialRate: 1.8564,
      },
      {
        Cur_ID: 458,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "KGS",
        Cur_Scale: 100,
        Cur_Name: "Сомов",
        Cur_OfficialRate: 2.9678,
      },
      {
        Cur_ID: 459,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "KZT",
        Cur_Scale: 1000,
        Cur_Name: "Тенге",
        Cur_OfficialRate: 5.8985,
      },
      {
        Cur_ID: 460,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "TRY",
        Cur_Scale: 10,
        Cur_Name: "Турецких лир",
        Cur_OfficialRate: 2.9044,
      },
      {
        Cur_ID: 429,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "GBP",
        Cur_Scale: 1,
        Cur_Name: "Фунт стерлингов",
        Cur_OfficialRate: 3.4961,
      },
      {
        Cur_ID: 463,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "CZK",
        Cur_Scale: 100,
        Cur_Name: "Чешских крон",
        Cur_OfficialRate: 11.6504,
      },
      {
        Cur_ID: 464,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "SEK",
        Cur_Scale: 10,
        Cur_Name: "Шведских крон",
        Cur_OfficialRate: 2.8985,
      },
      {
        Cur_ID: 426,
        Date: "2021-08-10T00:00:00",
        Cur_Abbreviation: "CHF",
        Cur_Scale: 1,
        Cur_Name: "Швейцарский франк",
        Cur_OfficialRate: 2.7468,
      },
    ] as IRate[];
    const ondate = new Date();
    nock(url)
      .get("/exrates/rates")
      .query({ periodicity: 0, ondate: ondate.toUTCString() })
      .reply(200, response);

    const data = await client.getRates({ ondate });
    deepStrictEqual(data, response);
  });

  test(".getRate() (rejects when `Cur_ID` is missing)", async () => {
    await rejects(
      () => client.getRate({} as { Cur_ID: number }),
      new TypeError("`Cur_ID` is missing")
    );
  });

  test(".getRate() (with `Cur_ID`)", async () => {
    const response = {
      Cur_ID: 431,
      Date: "2021-08-11T00:00:00",
      Cur_Abbreviation: "USD",
      Cur_Scale: 1,
      Cur_Name: "Доллар США",
      Cur_OfficialRate: 2.5138,
    } as IRate;
    const Cur_ID = 431;
    const ondate = new Date();
    nock(url)
      .get(`/exrates/rates/${Cur_ID}`)
      .query({ parammode: 0, periodicity: 0, ondate: ondate.toUTCString() })
      .reply(200, response);

    const data = await client.getRate({ Cur_ID, ondate });
    deepStrictEqual(data, response);
  });

  test(".getRate() (with `Cur_Code`)", async () => {
    const response = {
      Cur_ID: 431,
      Date: "2021-08-11T00:00:00",
      Cur_Abbreviation: "USD",
      Cur_Scale: 1,
      Cur_Name: "Доллар США",
      Cur_OfficialRate: 2.5138,
    } as IRate;
    const Cur_Code = "840";
    const ondate = new Date();
    nock(url)
      .get(`/exrates/rates/${Cur_Code}`)
      .query({ parammode: 1, periodicity: 0, ondate: ondate.toUTCString() })
      .reply(200, response);

    const data = await client.getRate({ Cur_Code, ondate });
    deepStrictEqual(data, response);
  });

  test(".getRate() (with `Cur_Abbreviation`)", async () => {
    const response = {
      Cur_ID: 431,
      Date: "2021-08-11T00:00:00",
      Cur_Abbreviation: "USD",
      Cur_Scale: 1,
      Cur_Name: "Доллар США",
      Cur_OfficialRate: 2.5138,
    } as IRate;
    const Cur_Abbreviation = "USD";
    const ondate = new Date();
    nock(url)
      .get(`/exrates/rates/${Cur_Abbreviation}`)
      .query({ parammode: 2, periodicity: 0, ondate: ondate.toUTCString() })
      .reply(200, response);

    const data = await client.getRate({ Cur_Abbreviation, ondate });
    deepStrictEqual(data, response);
  });

  test(".getDynamics()", async () => {
    const response = [
      {
        Cur_ID: 431,
        Date: "2021-08-01T00:00:00",
        Cur_OfficialRate: 2.4997,
      },
      {
        Cur_ID: 431,
        Date: "2021-08-02T00:00:00",
        Cur_OfficialRate: 2.4997,
      },
      {
        Cur_ID: 431,
        Date: "2021-08-03T00:00:00",
        Cur_OfficialRate: 2.4968,
      },
      {
        Cur_ID: 431,
        Date: "2021-08-04T00:00:00",
        Cur_OfficialRate: 2.5038,
      },
      {
        Cur_ID: 431,
        Date: "2021-08-05T00:00:00",
        Cur_OfficialRate: 2.5158,
      },
      {
        Cur_ID: 431,
        Date: "2021-08-06T00:00:00",
        Cur_OfficialRate: 2.5248,
      },
      { Cur_ID: 431, Date: "2021-08-07T00:00:00", Cur_OfficialRate: 2.514 },
      { Cur_ID: 431, Date: "2021-08-08T00:00:00", Cur_OfficialRate: 2.514 },
      { Cur_ID: 431, Date: "2021-08-09T00:00:00", Cur_OfficialRate: 2.514 },
      {
        Cur_ID: 431,
        Date: "2021-08-10T00:00:00",
        Cur_OfficialRate: 2.5166,
      },
      {
        Cur_ID: 431,
        Date: "2021-08-11T00:00:00",
        Cur_OfficialRate: 2.5138,
      },
    ] as IBaseRate[];
    const startdate = new Date("2021-8-1");
    const enddate = new Date();
    const Cur_ID = 431;
    nock(url)
      .get(`/exrates/rates/dynamics/${Cur_ID}`)
      .query({
        startdate: startdate.toUTCString(),
        enddate: enddate.toUTCString(),
      })
      .reply(200, response);

    const data = await client.getDynamics({ startdate, enddate, Cur_ID });
    deepStrictEqual(data, response);
  });
});
