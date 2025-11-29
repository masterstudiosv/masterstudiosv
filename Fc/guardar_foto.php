<?php
header('Content-Type: application/json');

// Crear carpeta de fotos si no existe
$carpeta_fotos = 'fotos';
if (!file_exists($carpeta_fotos)) {
    mkdir($carpeta_fotos, 0777, true);
}

// Listar fotos existentes
if (isset($_GET['action']) && $_GET['action'] === 'list') {
    $fotos = [];
    $archivos = glob($carpeta_fotos . '/*.png');
    
    foreach ($archivos as $archivo) {
        $fotos[] = [
            'filename' => basename($archivo),
            'url' => $archivo,
            'timestamp' => date('d/m/Y H:i', filemtime($archivo))
        ];
    }
    
    echo json_encode([
        'success' => true,
        'fotos' => $fotos
    ]);
    exit;
}

// Guardar nueva foto
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (!isset($data['imagen'])) {
        echo json_encode([
            'success' => false,
            'error' => 'No se recibió imagen'
        ]);
        exit;
    }
    
    // Extraer datos base64
    $imagen_base64 = $data['imagen'];
    $imagen_base64 = str_replace('data:image/png;base64,', '', $imagen_base64);
    $imagen_base64 = str_replace(' ', '+', $imagen_base64);
    $imagen_data = base64_decode($imagen_base64);
    
    // Generar nombre único
    $timestamp = time();
    $nombre_archivo = 'foto_' . $timestamp . '_' . rand(1000, 9999) . '.png';
    $ruta_completa = $carpeta_fotos . '/' . $nombre_archivo;
    
    // Guardar archivo
    if (file_put_contents($ruta_completa, $imagen_data)) {
        echo json_encode([
            'success' => true,
            'filename' => $nombre_archivo,
            'url' => $ruta_completa,
            'timestamp' => date('d/m/Y H:i')
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'No se pudo guardar el archivo'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Método no permitido'
    ]);
}
?>