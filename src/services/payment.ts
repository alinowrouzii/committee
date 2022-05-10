import { client } from "../config/axios";
import { ac_client } from "../config/ac_axios";
import { v4 as uuidv4 } from "uuid";

const get_shaba_number = async (card_num: string) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const result = await client({}).get(
    `https://apibeta.finnotech.ir/facility/v2/clients/alinow/cardToIban?version=2&card=${card_num}`,
    {
      headers: headers,
    }
  );
  const IBAN_number = result.data.result.IBAN;

  return IBAN_number;
};

const withdraw = async (dst_card_number: string, src_card_number: string) => {
  const dst_IBAN = await get_shaba_number(dst_card_number);

  const headers = {
    "Content-Type": "application/json",
  }

  const data = {
    paymentNumber: "1",
    destinationNumber: dst_IBAN,
    destinationFirstname: "علی",
    destinationLastname: "نوروزی",
    description: "test",
    amount: 10000,
    deposit: src_card_number,
    reasonDescription: "1",
  };

  const track_id = uuidv4()
  const result = await ac_client({}).post(`https://apibeta.finnotech.ir/oak/v2/clients/alinow/withdrawalFrom?trackId=${track_id}`, data, {
    headers: headers
  });

  return result.data.result
};

export { get_shaba_number, withdraw };
