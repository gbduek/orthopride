<?php

namespace App\Pix;

class Payload{
    /**
   * IDs do Payload do Pix
   * @var string
   */
  const ID_PAYLOAD_FORMAT_INDICATOR = '00';
  const ID_MERCHANT_ACCOUNT_INFORMATION = '26';
  const ID_MERCHANT_ACCOUNT_INFORMATION_GUI = '00';
  const ID_MERCHANT_ACCOUNT_INFORMATION_KEY = '01';
  const ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = '02';
  const ID_MERCHANT_CATEGORY_CODE = '52';
  const ID_TRANSACTION_CURRENCY = '53';
  const ID_TRANSACTION_AMOUNT = '54';
  const ID_COUNTRY_CODE = '58';
  const ID_MERCHANT_NAME = '59';
  const ID_MERCHANT_CITY = '60';
  const ID_ADDITIONAL_DATA_FIELD_TEMPLATE = '62';
  const ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = '05';
  const ID_CRC16 = '63';

   /**
   * Chave Pix
   * @var string
   */
  
   private $pixKey;



   /**
   * Descrição do Pagamento
   * @var string
   */
  
   private $description;


   /**
   * Nome do Titular da Conta
   * @var string
   */
  
   private $merchantName;


   /**
   * Cidade do Titular da Conta
   * @var string
   */
  
   private $merchantCity;


   /**
   * ID da Transação PIX
   * @var string
   */
  
   private $txid;


   /**
   * Valor da Transação PIX
   * @var string
   */
  
   private $amount;



      /**
    * Define a chave Pix
    * @param string $pixKey
    * @return Payload
    */
    public function setPixKey($pixKey){
        $this->pixKey = $pixKey;
        return $this;
   }

   /**
    * Define a descrição do pagamento
    * @param string $description
    * @return Payload
    */
   public function setDescription($description){
        $this->description = $description;
        return $this;
   }

   /**
    * Define o nome do titular da conta
    * @param string $merchantName
    * @return Payload
    */
   public function setMerchantName($merchantName){
        $this->merchantName = $merchantName;
        return $this;
   }

   /**
    * Define a cidade do titular da conta
    * @param string $merchantCity
    * @return Payload
    */
   public function setMerchantCity($merchantCity){
        $this->merchantCity = $merchantCity;
        return $this;
   }

   /**
    * Define o ID da transação Pix
    * @param string $txid
    * @return Payload
    */
   public function setTxid($txid){
        $this->txid = $txid;
        return $this;
   }

   /**
    * Define o valor da transação Pix
    * @param float $amount
    * @return Payload
    */
   public function setAmount($amount){
        $this->amount = (string)number_format($amount,2,'.','');
        return $this;
   }



    /**
     * Responsável por retornar o valor completo de um objeto do payload
     * @param  string $id
     * @param  string $value
     * @return string $id.$size.$value
     */
    private function getValue($id, $value){
        $size = str_pad(strlen($value), 2, '0', STR_PAD_LEFT);
        return $id.$size.$value;
    }


        /**
     * Método responsável por retornar os valores completos da informação da conta
     * @return string
     */
    private function getMerchantAccountInformation(){
        // DOMÍNIO DO BANCO
        $gui = $this->getValue(self::ID_MERCHANT_ACCOUNT_INFORMATION_GUI, 'br.gov.bcb.pix');

        // CHAVE PIX
        $key = $this->getValue(self::ID_MERCHANT_ACCOUNT_INFORMATION_KEY, $this->pixKey);

        // DESCRIÇÃO DO PAGAMENTO
        $description = strlen($this->description) ? 
            $this->getValue(self::ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION, $this->description) : '';

        // Junta todos os dados e retorna
        return $this->getValue(self::ID_MERCHANT_ACCOUNT_INFORMATION, $gui.$key.$description);
    }


        /**
     * Método responsável por retornar os valores completos do campo adicional do pix (TXID)
     * @return string
     */
    private function getAdditionalDataFieldTemplate(){
        // TXID
        $txid = $this->getValue(self::ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, $this->txid);

        // RETORNA O VALOR COMPLETO
        return $this->getValue(self::ID_ADDITIONAL_DATA_FIELD_TEMPLATE, $txid);
    }




    /**
    * Responsável por gerar o código completo do payload PIX
    * @return string
    */
   public function getPayload(){
    $payload = $this->getValue(self::ID_PAYLOAD_FORMAT_INDICATOR, '01').
                $this->getMerchantAccountInformation().
                $this->getValue(self::ID_MERCHANT_CATEGORY_CODE,'0000').
                $this->getValue(self::ID_TRANSACTION_CURRENCY,'986').
                $this->getValue(self::ID_TRANSACTION_AMOUNT,$this->amount).
                $this->getValue(self::ID_COUNTRY_CODE,'BR').
                $this->getValue(self::ID_MERCHANT_NAME,$this->merchantName).
                $this->getValue(self::ID_MERCHANT_CITY,$this->merchantCity).
                $this->getAdditionalDataFieldTemplate();

    //Retorna o Payload + CRC16
    return $payload.$this->getCRC16($payload);
   }



        /**
     * Método responsável por calcular o valor da hash de validação do código pix
     * @return string
     */
    private function getCRC16($payload) {
        //ADICIONA DADOS GERAIS NO PAYLOAD
        $payload .= self::ID_CRC16.'04';

        //DADOS DEFINIDOS PELO BACEN
        $polinomio = 0x1021;
        $resultado = 0xFFFF;

        //CHECKSUM
        if (($length = strlen($payload)) > 0) {
            for ($offset = 0; $offset < $length; $offset++) {
                $resultado ^= (ord($payload[$offset]) << 8);
                for ($bitwise = 0; $bitwise < 8; $bitwise++) {
                    if (($resultado <<= 1) & 0x10000) $resultado ^= $polinomio;
                    $resultado &= 0xFFFF;
                }
            }
        }

        //RETORNA CÓDIGO CRC16 DE 4 CARACTERES
        return self::ID_CRC16.'04'.strtoupper(dechex($resultado));
    }

}