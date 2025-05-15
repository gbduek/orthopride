<?php

namespace App\Pix;

class Payload{
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

    private $pixKey;
    private $description;
    private $merchantName;
    private $merchantCity;
    private $txid;
    private $amount;

    public function setPixKey($pixKey){
        $this->pixKey = $pixKey;
        return $this;
    }

    public function setDescription($description){
        $this->description = $description;
        return $this;
    }

    public function setMerchantName($merchantName){
        $this->merchantName = $merchantName;
        return $this;
    }

    public function setMerchantCity($merchantCity){
        $this->merchantCity = $merchantCity;
        return $this;
    }

    public function setTxid($txid){
        $this->txid = $txid;
        return $this;
    }

    public function setAmount($amount){
        $this->amount = (string)number_format($amount, 2, '.', '');
        return $this;
    }

    private function getValue($id, $value){
        $size = str_pad(strlen($value), 2, '0', STR_PAD_LEFT);
        return $id . $size . $value;
    }

    private function getMerchantAccountInformation(){
        // DOMÍNIO DO BANCO
        $gui = $this->getValue(self::ID_MERCHANT_ACCOUNT_INFORMATION_GUI, 'br.gov.bcb.pix');

        // CHAVE PIX
        $key = $this->getValue(self::ID_MERCHANT_ACCOUNT_INFORMATION_KEY, $this->pixKey);

        // Verifica se é chave aleatória (UUID v4)
        $isAleatoria = (bool)preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $this->pixKey);

        // Adiciona descrição apenas se for chave aleatória
        $description = ($isAleatoria && strlen($this->description)) 
            ? $this->getValue(self::ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION, $this->description) 
            : '';

        // Junta todos os dados e retorna
        return $this->getValue(self::ID_MERCHANT_ACCOUNT_INFORMATION, $gui . $key . $description);
    }

    private function getAdditionalDataFieldTemplate(){
        $txid = $this->getValue(self::ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, $this->txid);
        return $this->getValue(self::ID_ADDITIONAL_DATA_FIELD_TEMPLATE, $txid);
    }

    public function getPayload(){
        $payload = $this->getValue(self::ID_PAYLOAD_FORMAT_INDICATOR, '01') .
                   $this->getMerchantAccountInformation() .
                   $this->getValue(self::ID_MERCHANT_CATEGORY_CODE, '0000') .
                   $this->getValue(self::ID_TRANSACTION_CURRENCY, '986') .
                   $this->getValue(self::ID_TRANSACTION_AMOUNT, $this->amount) .
                   $this->getValue(self::ID_COUNTRY_CODE, 'BR') .
                   $this->getValue(self::ID_MERCHANT_NAME, $this->merchantName) .
                   $this->getValue(self::ID_MERCHANT_CITY, $this->merchantCity) .
                   $this->getAdditionalDataFieldTemplate();

        return $payload . $this->getCRC16($payload);
    }

    private function getCRC16($payload){
        $payload .= self::ID_CRC16 . '04';

        $polinomio = 0x1021;
        $resultado = 0xFFFF;

        for ($offset = 0; $offset < strlen($payload); $offset++) {
            $resultado ^= (ord($payload[$offset]) << 8);
            for ($bitwise = 0; $bitwise < 8; $bitwise++) {
                if (($resultado <<= 1) & 0x10000) {
                    $resultado ^= $polinomio;
                }
                $resultado &= 0xFFFF;
            }
        }

        return self::ID_CRC16 . '04' . strtoupper(dechex($resultado));
    }
}
