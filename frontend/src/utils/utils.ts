type AlertType = 'info' | 'danger' | 'success' | 'warning';

function getAlertHtml(alertType: AlertType, message: string): string {
    const bgColor = {
        'info': 'bg-blue-100 text-blue-700',
        'danger': 'bg-red-100 text-red-700',
        'success': 'bg-green-100 text-green-700',
        'warning': 'bg-yellow-100 text-yellow-700'
    }[alertType];

    const icon = {
        'info': 'fa-solid fa-circle-info',
        'danger': 'fa-solid fa-circle-exclamation',
        'success': 'fa-solid fa-circle-check',
        'warning': 'fa-solid fa-triangle-exclamation'
    }[alertType];

    const msg = {
        'info': 'Info',
        'danger': 'Error',
        'success': 'Éxito',
        'warning': 'Advertencia'
    }[alertType];

    return `
        <div class="${bgColor} rounded-lg p-4 mb-4 text-sm" role="alert">
            <i class="${icon}"> <span class="font-bold font-sans">${msg}</span></i>
            <div>
                ${message}
            </div>
        </div>
    `;
}

let activeAlerts: HTMLElement[] = [];

export function showAlert(alertType: AlertType, message: string, duration: number = 3000): void {
    const alertElement = document.createElement('div');
    alertElement.innerHTML = getAlertHtml(alertType, message);
    alertElement.classList.add(
        'fixed', 'right-2', 'z-50',
        'rounded-lg', 'p-4', 'w-64',
        'overflow-hidden', 'break-words',
        'text-sm', 'font-sans'
    );

    const bottomOffset = 5 + activeAlerts.length * 75; // 75px es la altura de una alerta.
    alertElement.style.bottom = `${bottomOffset}px`;

    document.body.appendChild(alertElement);
    activeAlerts.push(alertElement);

    setTimeout(() => {
        document.body.removeChild(alertElement);
        activeAlerts = activeAlerts.filter(alert => alert !== alertElement);

        activeAlerts.forEach((alert, index) => {
            alert.style.bottom = `${5 + index * 60}px`;
        });
    }, duration);
}