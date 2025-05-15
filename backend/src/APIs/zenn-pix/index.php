<?php

require __DIR__ . '/vendor/autoload.php';

use \App\Pix\Payload;
use Mpdf\QrCode\QrCode;
use Mpdf\QrCode\Output;

// Define o header como JSON
header('Content-Type: application/json');

// Configuração da conexão com o banco de dados PostgreSQL
$host = 'localhost';
$port = '5433';
$db   = 'orthopride';
$user = 'postgres';
$pass = 'sichagabi';

$dsn = "pgsql:host=$host;port=$port;dbname=$db";

try {
    // Cria a conexão PDO
    $pdo = new PDO($dsn, $user, $pass);

    // Busca a chave Pix da empresa com id=1
    $stmt = $pdo->query("SELECT pix FROM company WHERE id = 1");
    $pixKey = $stmt->fetchColumn();

    if (!$pixKey) {
        throw new Exception("Chave Pix não encontrada.");
    }

    // Cria o payload do Pix
    $obPayload = (new Payload)
        ->setPixKey($pixKey)
        ->setDescription('Pagamento do pedido 123456')
        ->setMerchantName('Orthopride')
        ->setMerchantCity('RIO DE JANEIRO')
        ->setAmount(5.00)
        ->setTxid('ZENN1234');

    // Gera o payload em string
    $payloadQrCode = $obPayload->getPayload();

    // Cria o QR Code a partir do payload
    $obQrCode = new QrCode($payloadQrCode);

    // Gera a imagem PNG do QR Code com 400x400 pixels
    $image = (new Output\Png)->output($obQrCode, 400);

    // Converte a imagem para base64 para envio em JSON
    $base64Image = 'data:image/png;base64,' . base64_encode($image);

    // Retorna os dados como JSON
    echo json_encode([
        'payload' => $payloadQrCode,
        'qrcode_base64' => $base64Image
    ]);

} catch (Exception $e) {
    // Em caso de erro, retorna o erro em JSON
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}