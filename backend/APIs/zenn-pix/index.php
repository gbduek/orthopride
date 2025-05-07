<?php

require __DIR__ . '/vendor/autoload.php';

use \App\Pix\Payload;
use Mpdf\QrCode\QrCode;
use Mpdf\QrCode\Output;

// Define o header como JSON
header('Content-Type: application/json');

// Cria o payload do Pix
$obPayload = (new Payload)
    ->setPixKey('19bb05af-b6d9-4b10-abf4-fad957ded884')
    ->setDescription('Pagamento do pedido 123456')
    ->setMerchantName('Orthopride')
    ->setMerchantCity('RIO DE JANEIRO')
    ->setAmount(5.00)
    ->setTxid('ZENN1234');

// Gera o código Pix e QR Code
$payloadQrCode = $obPayload->getPayload();
$obQrCode = new QrCode($payloadQrCode);
$image = (new Output\Png)->output($obQrCode, 400);

// Converte o QR Code para base64
$base64Image = 'data:image/png;base64,' . base64_encode($image);

// Retorna tudo como JSON
echo json_encode([
    'payload' => $payloadQrCode,
    'qrcode_base64' => $base64Image
]);