// ========================================
// CALCULADORA INTELIGENTE - JavaScript
// ========================================

// Variables globales para almacenar el estado de la calculadora
let currentValue = '0';        // Valor actual mostrado en pantalla
let previousValue = null;      // Valor anterior para cálculos
let operation = null;          // Operación actual (+, -, *, /)
let shouldResetDisplay = false; // Flag para reiniciar display después de una operación

// ========================================
// FUNCIONES PRINCIPALES
// ========================================

/**
 * Obtiene el elemento display de la calculadora
 * @returns {HTMLElement} Elemento input del display
 */
function getDisplay() {
    return document.getElementById('display');
}

/**
 * Actualiza el valor mostrado en el display
 */
function updateDisplay() {
    const display = getDisplay();
    display.value = currentValue;
}

/**
 * Agrega un número al display
 * @param {string} number - Número a agregar (0-9 o punto decimal)
 */
function appendNumber(number) {
    // Si se debe reiniciar el display, comenzar con el nuevo número
    if (shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else {
        // Evitar múltiples puntos decimales
        if (number === '.' && currentValue.includes('.')) {
            return;
        }
        
        // Si el valor actual es '0', reemplazarlo (excepto si se agrega un punto)
        if (currentValue === '0' && number !== '.') {
            currentValue = number;
        } else {
            currentValue += number;
        }
    }
    
    updateDisplay();
}

/**
 * Establece la operación a realizar
 * @param {string} op - Operador (+, -, *, /)
 */
function appendOperator(op) {
    // Si ya hay una operación pendiente, calcular primero
    if (operation !== null && !shouldResetDisplay) {
        calculate();
    }
    
    // Guardar el valor actual y la operación
    previousValue = parseFloat(currentValue);
    operation = op;
    shouldResetDisplay = true;
}

/**
 * Realiza el cálculo según la operación seleccionada
 */
function calculate() {
    // Verificar que hay una operación y un valor previo
    if (operation === null || previousValue === null) {
        return;
    }
    
    const current = parseFloat(currentValue);
    let result = 0;
    
    // Realizar la operación correspondiente
    switch (operation) {
        case '+':
            result = previousValue + current;
            break;
        case '-':
            result = previousValue - current;
            break;
        case '*':
            result = previousValue * current;
            break;
        case '/':
            // Evitar división por cero
            if (current === 0) {
                alert('Error: No se puede dividir por cero');
                clearDisplay();
                return;
            }
            result = previousValue / current;
            break;
        default:
            return;
    }
    
    // Redondear el resultado a 8 decimales para evitar errores de precisión
    result = Math.round(result * 100000000) / 100000000;
    
    // Actualizar el estado
    currentValue = result.toString();
    operation = null;
    previousValue = null;
    shouldResetDisplay = true;
    
    updateDisplay();
}

/**
 * Limpia el display y reinicia la calculadora
 */
function clearDisplay() {
    currentValue = '0';
    previousValue = null;
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// ========================================
// MANEJO DE TECLADO (OPCIONAL)
// ========================================

/**
 * Permite usar el teclado para interactuar con la calculadora
 */
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        // Números del 0 al 9
        if (key >= '0' && key <= '9') {
            appendNumber(key);
        }
        // Punto decimal
        else if (key === '.' || key === ',') {
            appendNumber('.');
        }
        // Operadores
        else if (key === '+') {
            appendOperator('+');
        }
        else if (key === '-') {
            appendOperator('-');
        }
        else if (key === '*') {
            appendOperator('*');
        }
        else if (key === '/') {
            event.preventDefault(); // Evitar búsqueda en el navegador
            appendOperator('/');
        }
        // Enter o igual para calcular
        else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculate();
        }
        // Escape o C para limpiar
        else if (key === 'Escape' || key === 'c' || key === 'C') {
            clearDisplay();
        }
        // Backspace para borrar último dígito
        else if (key === 'Backspace') {
            if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
            } else {
                currentValue = '0';
            }
            updateDisplay();
        }
    });
    
    // Inicializar el display
    updateDisplay();
    
    console.log('✅ Calculadora Inteligente cargada correctamente');
    console.log('💡 Puedes usar el teclado para interactuar con la calculadora');
});