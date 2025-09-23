import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

const Invoice = ({
  invoiceNumber,
  currentDate,
  dueDate,
  dueBalance,
  hours,
  rate,
  detailed,
}: {
  invoiceNumber: string;
  currentDate: string;
  dueDate: string;
  dueBalance: string;
  hours: number;
  rate: number;
  detailed: {
    day: string;
    total: string;
    hours: number;
  }[];
}) => (
  <html>
    <head>
      <title>Invoice</title>
      <link rel="stylesheet" href="/public/style.css" />
    </head>
    <body>
      <header>
        <div class="title">
          <div>
            <div class="myInfo">
              <span>FROM:</span>
              <p class="bold" style="margin-top: 0.5rem">
                JOAO PEDRO PIN PORTA 40174460864
              </p>
              <p>jpedro.porta@gmail.com</p>
              <p>R LUIS ROBERTO GOES, 176, G-17</p>
              <p>PARQUE BRASIL 500 - PAULINIA - SP</p>
              <p>Zip Code: 13.141-064</p>
            </div>

            <div class="billTo">
              <span>TO:</span>
              <p class="bold" style="margin-top: 0.5rem;">
                Avodah, Inc. (Corporate)
              </p>
              <p>Office Address: 1600 SOLANA BLVD, SUITE 8110,</p>
              <p>WESTLAKE, TX 76262</p>
              <p>Phone: 817.588.7100</p>
            </div>
          </div>
          <div>
            <hgroup>
              <h1>INVOICE</h1>
              <h2>#{invoiceNumber}</h2>
            </hgroup>
            <div class="balance">
              <div class="row">
                <p>Date:</p>
                <p>{currentDate}</p>
              </div>
              <div class="row">
                <p>Due Date:</p>
                <p>{dueDate}</p>
              </div>
              <div class="row gray-bg">
                <p class="bold">Balance Due:</p>
                <p class="bold">{dueBalance}</p>
              </div>
            </div>
          </div>
        </div>
        <h4>
          Departament: <span style="color: #F27054">AvodahMed</span> Engineering
        </h4>
      </header>
      <main>
        <table style="width: 100%">
          <thead style="background-color: black; color: white">
            <tr>
              <td style="padding: 0.5rem 1rem;border: none;">Date</td>
              <td style="padding: 0.5rem 1rem;border: none;">
                Task Description
              </td>
              <td style="padding: 0.5rem 1rem;border: none;">Hours Worked</td>
              <td style="padding: 0.5rem 1rem;border: none;">Rate</td>
              <td style="padding: 0.5rem 1rem;border: none;">Total</td>
            </tr>
          </thead>
          <tbody>
            {detailed.map(({ day, total, hours }) => (
              <tr>
                <td>{day}</td>
                <td style="font-style: italic">Worked on AvodahMed</td>
                <td>{total}</td>
                <td>US$ {rate} / hr</td>
                <td>US$ {Number(hours * rate).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colspan="2" style="text-align: right">
                Hours Subtotal
              </td>
              <td>{hours}h</td>
              <td>US$ {rate} / hr</td>
              <td>US$ {Number(hours * rate).toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right">
                Subtotal:
              </td>
              <td>US$ {dueBalance}</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right">
                Tax:
              </td>
              <td>US$ 0,00</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: right">
                Total:
              </td>
              <td>{dueBalance}</td>
            </tr>
          </tbody>
        </table>

        <footer>
          <div>
            <h3>Payment Information</h3>
            <div style="margin-bottom: 1rem;">
              <p>Benificiary</p>
              <p>JOAO PEDRO PIN PORTA 40174460864</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <p>Address</p>
              <p>Campinas, Brazil</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <p>IBAN</p>
              <p>JOAO PEDRO PIN PORTA 40174460864</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <p>Benificiary</p>
              <p>BR1178632767000010005264481C1</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <p>SWIFT Code</p>
              <p>OURIBRSPXXX</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <p>Branch Code</p>
              <p>00001</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <p>Bank Name</p>
              <p>BANCO OURINVEST S.A</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <p>Bank Address</p>
              <p>Sao Paulo, Brazil</p>
            </div>
          </div>
          <div>
            <h3>
              Payment Instructions
              <br />
              Terms and Conditions:
            </h3>
            <p style="max-width: 50vw; font-size: 0.9rem; line-height: 1.4rem">
              Payment due within contract terms (within 15 days)
              <br />
              Invoice Due Date: Semi-Monthly (15th and Last Day of the Month)
              <br />
              Invoice Submission Detail: Please forward a copy of this invoice
              to your direct supervisor or manager for approval. Additionally,
              include accounting@avodah.com for visibility.
              <br />
              Once your supervisor or manager has approved the invoice, the
              Avodah Accounting team will process it for payment.
            </p>
          </div>
        </footer>
      </main>
    </body>
  </html>
);
export const invoicePlugin = new Elysia({ prefix: "/invoice" })
  .use(html())
  .get("/", async ({ query: { days, rate = 62.5, offset = 0 }, set }) => {
    set.headers["Content-Type"] = "text/html";
    let hours;
    dayjs.extend(duration);
    const currentDate = dayjs(new Date()).format("MMM DD, YYYY");
    const dueDate = dayjs(new Date()).add(15, "days").format("MMM DD, YYYY");
    let detailed: {
      Date: string;
      Total: number;
    }[] = [];
    if (days) {
      hours = Number(days) * 8;
    } else {
      const totalResp = await fetch(
        Bun.env.TIMETRACKER_URL + `/invoice/total?offset=${offset}`,
      );
      const { Total, Detailed } = (await totalResp.json()) as {
        Total: number;
        Start: string;
        End: string;
        Detailed: {
          Date: string;
          Total: number;
        }[];
      };
      hours = Total;
      detailed = Detailed;
    }

    console.log(detailed.map((d) => d.Date.split("T")[0]));
    const data = {
      invoiceNumber: dayjs(new Date()).format("YYYYMMDD"),
      currentDate,
      dueDate,
      dueBalance: (hours * Number(rate)).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      hours,
      rate: Number(rate) || 50,
      detailed: detailed.map((day) => ({
        day: dayjs(day.Date.split("T")[0]).format("MMM DD, YYYY"),
        total: dayjs.duration(day.Total, "hours").format("HH[h]mm[m]"),
        hours: day.Total,
      })),
    };

    return <Invoice {...data} />;
  });
