import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
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
  detailed: { day: string; total: string }[];
}) => (
  <html>
    <head>
      <title>Invoice</title>
    </head>
    <style>
      {`
    @page {
	size: A4;

    }
* {
margin: 0;
padding: 0;
box-sizing: border-box;
 }
body {
font-family: Arial, Helvetica, sans-serif;
-webkit-print-color-adjust:exact !important;
  print-color-adjust:exact !important;
}
.bold {
	font-weight: bold;
}
.title, .summary {
display: flex;
justify-content: space-between;
margin-bottom: 4rem;
}

hgroup {
text-align: right;
}
h1 {
font-size: 3rem;
}
hgroup > h2 {
font-size: 1rem;
color: #666;
margin-top: 0.5rem;
}
.myInfo {
margin-top: 0.5rem;
}
.billTo > span{
color: #666;
}
.balance{
display: flex;
flex-direction: column;
gap: 0.5rem;
min-width: 30%;
}
.balance > div {
display: flex;
justify-content: end;
gap: 2rem;
padding: 0.5rem 1rem;
border-radius: 0.25rem;
}
.balance p {
text-align: right;
}
.gray-bg {
background-color: #eee;
}

th, td {
padding: 0.5rem;
}

tbody > tr:nth-child(even) {
background-color: #f2f2f2;
}


`}
    </style>

    <body>
      <header>
        <div class="title">
          <div class="myInfo">
            <p class="bold">JOAO PEDRO PIN PORTA 40174460864</p>
            <p>R LUIS ROBERTO GOES, 176, G-17</p>
            <p>PARQUE BRASIL 500 - PAULINIA - SP</p>
            <p>Zip Code: 13.141-064</p>
          </div>
          <hgroup>
            <h1>INVOICE</h1>
            <h2>#{invoiceNumber}</h2>
          </hgroup>
        </div>

        <div class="summary">
          <div class="billTo">
            <span>Bill To:</span>
            <p class="bold" style="margin-top: 0.5rem;">
              Avodah, Inc. (Corporate)
            </p>
            <p>Office Address: 1600 SOLANA BLVD, SUITE 8110,</p>
            <p>WESTLAKE, TX 76262</p>
            <p>Phone: 817.588.7100</p>
          </div>
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
      </header>
      <main>
        <table style="width: 100%">
          <thead style="background-color: #444; color: white">
            <tr>
              <td style="padding: 0.5rem 1rem;border: none;">Item</td>
              <td style="padding: 0.5rem 1rem;border: none;">Quantity</td>
              <td style="padding: 0.5rem 1rem;border: none;">Rate</td>
              <td style="padding: 0.5rem 1rem;border: none;">Amount</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.5rem 1rem;border: none;">
                <p class="bold">Summary:</p>
                <p style="color: #666">
                  {hours} hours * US${rate}/hour = {dueBalance}
                </p>
              </td>
              <td style="padding: 0.5rem 1rem;border: none;">1</td>
              <td style="padding: 0.5rem 1rem;border: none;">{dueBalance}</td>
              <td style="padding: 0.5rem 1rem;border: none;">{dueBalance}</td>
            </tr>
          </tbody>
        </table>
        <div class="balance" style="margin-left: auto; margin-top: 2rem;">
          <div class="row">
            <p>Subtotal:</p>
            <p style="min-width: 8rem;">{dueBalance}</p>
          </div>
          <div class="row">
            <p>Tax:</p>
            <p style="min-width: 8rem;">US$ 0,00</p>
          </div>
          <div class="row">
            <p>Total:</p>
            <p style="min-width: 8rem;">{dueBalance}</p>
          </div>
        </div>
      </main>
      <footer style="display:flex; justify-content: space-between">
        <div>
          <p style="color: #666; margin-bottom: 0.5rem">Notes:</p>
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
          <div style="height: 4rem" />
          <table style="margin-right: 1rem; width: 20">
            <thead style="background-color: #444; color: white;">
              <tr style="text-align: left">
                <th>Date</th>
                <th>Worked Hours</th>
              </tr>
            </thead>
            <tbody>
              {detailed.map((day) => (
                <tr>
                  <td>{day.day}</td>
                  <td>{day.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>
    </body>
  </html>
);
export const invoicePlugin = new Elysia({ prefix: "/invoice" })
  .use(html())
  .get("/", async ({ query: { days, rate = 50 } }) => {
    let hours;
    dayjs.extend(duration);
    const currentDate = dayjs(new Date()).format("MMM DD, YYYY");
    const dueDate = dayjs(new Date()).add(15, "days").format("MMM DD, YYYY");
    let detailed: { Date: string; Total: number }[] = [];
    if (days) {
      hours = Number(days) * 8;
    } else {
      const totalResp = await fetch(Bun.env.TIMETRACKER_URL + "/invoice/total");
      const { Total, Detailed } = (await totalResp.json()) as {
        Total: number;
        Start: string;
        End: string;
        Detailed: { Date: string; Total: number }[];
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
      })),
    };

    return <Invoice {...data} />;
  });
