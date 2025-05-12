<?php
/**
 * API para configuração e teste da integração PayGo
 * Smart Zenn Digital
 */

// Incluir dependências
require_once __DIR__ . '/../database/db_config.php';
require_once __DIR__ . '/../database/paygo_api.php';

// Configurar cabeçalhos para API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Verificar método da requisição
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Responder a requisições preflight CORS
    http_response_code(200);
    exit;
}

// Obter ação da requisição
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Processar ação
switch ($action) {
    case 'get_config':
        getPayGoConfig();
        break;
    case 'save_config':
        savePayGoConfig();
        break;
    case 'test_connection':
        testPayGoConnection();
        break;
    default:
        responder(false, 'Ação não reconhecida');
}

/**
 * Obter configurações da API PayGo
 */
function getPayGoConfig() {
    try {
        $db = Database::getInstance();
        $result = $db->query("SELECT config_key, config_value FROM system_config WHERE config_key IN ('paygo_client_id', 'paygo_client_secret', 'paygo_environment')");
        
        $config = [
            'client_id' => '',
            'client_secret' => '',
            'environment' => 'sandbox',
            'is_connected' => false
        ];
        
        if ($result) {
            foreach ($result as $row) {
                if ($row['config_key'] == 'paygo_client_id') {
                    $config['client_id'] = $row['config_value'];
                } else if ($row['config_key'] == 'paygo_client_secret') {
                    $config['client_secret'] = $row['config_value'];
                } else if ($row['config_key'] == 'paygo_environment') {
                    $config['environment'] = $row['config_value'];
                }
            }
        }
        
        // Verificar se está conectado
        if (!empty($config['client_id']) && !empty($config['client_secret'])) {
            $paygo = new PayGoAPI($config['client_id'], $config['client_secret']);
            try {
                $paygo->getToken();
                $config['is_connected'] = true;
            } catch (Exception $e) {
                $config['is_connected'] = false;
            }
        }
        
        responder(true, 'Configurações obtidas com sucesso', ['config' => $config]);
    } catch (Exception $e) {
        responder(false, 'Erro ao obter configurações: ' . $e->getMessage());
    }
}

/**
 * Salvar configurações da API PayGo
 */
function savePayGoConfig() {
    // Obter dados da requisição
    $dados = json_decode(file_get_contents('php://input'), true);
    
    if (!$dados) {
        responder(false, 'Dados inválidos');
        return;
    }
    
    // Validar dados
    if (!isset($dados['client_id']) || !isset($dados['client_secret'])) {
        responder(false, 'Parâmetros obrigatórios: client_id, client_secret');
        return;
    }
    
    try {
        $db = Database::getInstance();
        
        // Salvar client_id
        $db->execute(
            "INSERT INTO system_config (config_key, config_value) VALUES ('paygo_client_id', :value) 
             ON DUPLICATE KEY UPDATE config_value = :value",
            ['value' => $dados['client_id']]
        );
        
        // Salvar client_secret
        $db->execute(
            "INSERT INTO system_config (config_key, config_value) VALUES ('paygo_client_secret', :value) 
             ON DUPLICATE KEY UPDATE config_value = :value",
            ['value' => $dados['client_secret']]
        );
        
        // Salvar environment
        $environment = isset($dados['environment']) ? $dados['environment'] : 'sandbox';
        $db->execute(
            "INSERT INTO system_config (config_key, config_value) VALUES ('paygo_environment', :value) 
             ON DUPLICATE KEY UPDATE config_value = :value",
            ['value' => $environment]
        );
        
        responder(true, 'Configurações salvas com sucesso');
    } catch (Exception $e) {
        responder(false, 'Erro ao salvar configurações: ' . $e->getMessage());
    }
}

/**
 * Testar conexão com a API PayGo
 */
function testPayGoConnection() {
    // Obter dados da requisição
    $dados = json_decode(file_get_contents('php://input'), true);
    
    if (!$dados) {
        responder(false, 'Dados inválidos');
        return;
    }
    
    // Validar dados
    if (!isset($dados['client_id']) || !isset($dados['client_secret'])) {
        responder(false, 'Parâmetros obrigatórios: client_id, client_secret');
        return;
    }
    
    try {
        $paygo = new PayGoAPI($dados['client_id'], $dados['client_secret']);
        $result = $paygo->testConnection();
        
        if ($result['success']) {
            responder(true, $result['message']);
        } else {
            responder(false, $result['message']);
        }
    } catch (Exception $e) {
        responder(false, 'Erro ao testar conexão: ' . $e->getMessage());
    }
}

/**
 * Responder requisição em formato JSON
 */
function responder($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response = array_merge($response, $data);
    }
    
    echo json_encode($response);
    exit;
}
