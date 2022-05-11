import AxiosClient from "../config/axios";
import ACAxiosClient from "../config/ac_axios";
import { v4 as uuidv4 } from "uuid";

export class FinnotechServices {
  constructor(){}

  static async getShebaNumber (card_num: string) {

    const headers = {
      "Content-Type": "application/json",
    };
  
    const axiosClient = new AxiosClient({})
    const result = await axiosClient.axiosInstance.get(
      `https://apibeta.finnotech.ir/facility/v2/clients/alinow/cardToIban?version=2&card=${card_num}`,
      {
        headers: headers,
      }
    );
    const IbanNumber = result.data.result.IBAN;
    console.log(IbanNumber)
  
    return IbanNumber;
  };
  
  static async withdraw (dst_card_number: string, src_card_number: string) {
    const dst_IBAN = await FinnotechServices.getShebaNumber(dst_card_number);
  
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
    console.log(track_id)
  
    const axiosClient = new ACAxiosClient({})
    const result = await axiosClient.axiosInstance.post(`https://apibeta.finnotech.ir/oak/v2/clients/alinow/withdrawalFrom?trackId=${track_id}`, data, {
      headers: headers
    });
  
    return result.data.result
  };
  
}

