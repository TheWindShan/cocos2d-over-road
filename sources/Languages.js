/**
 * Tooflya Inc. Development
 *
 * @author Igor Mats from Tooflya Inc.
 * @copyright (c) 2014 by Igor Mats
 * http://www.tooflya.com/development/
 *
 *
 * License: Tooflya Inc. Software License v1.
 *
 * Licensee may not use this software for commercial purposes. For the purpose of this license,
 * commercial purposes means that a 3rd party has to pay in order to access Software or that
 * the Website that runs Software is behind a paywall. In consideration of the License granted
 * under clause 2, Licensee shall pay Licensor a fee, via Credit-Card, PayPal or any other
 * mean which Licensor may deem adequate. Failure to perform payment shall construe as material
 * breach of this Agreement. This software is provided under an AS-IS basis and without any support,
 * updates or maintenance. Nothing in this Agreement shall require Licensor to provide Licensee with
 * support or fixes to any bug, failure, mis-performance or other defect in The Software.
 *
 * @version of cocos2d is 3.1 Final
 *
 */

var languages = {
  'frames': [
    {title: 'FPS: $1', font: 'RetroVille NC', size: 4, dimensions: false},
    {title: 'FPS: $1', font: 'RetroVille NC', size: 4, dimensions: false}
  ],
  'loading-1': [
    {title: 'Loading textures: $1 from $2', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Загрузка ресурсов: $1 из $2', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'loading-2': [
    {title: 'Checking updates.', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Проверка обновлений.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'loading-3': [
    {title: 'Verify account.', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Проверка информации.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'loading-4': [
    {title: 'Connecting to the server.', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Подключение к серверу.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'update-error-1': [
    {title: 'Update error: package broken.', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Ошибка: приложение повреждено.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'update-error-2': [
    {title: 'Update error: network broken.\nLet\'s try again.', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Ошибка загрузки: пробуем еще раз.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'update-error-3': [
    {title: 'Update error: network corrupted.', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Ошибка загрузки: проблемы с сетью.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'update-progress-1': [
    {title: 'Update in progress...', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Ожидание обновления.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'update-complete': [
    {title: 'Update successfully completed.', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Обновление успешно завершено.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'update-finish': [
    {title: 'Laters version installed.', font: 'RetroVille NC', size: 6, dimensions: false},
    {title: 'Установлена последняя версия.', font: 'RetroVille NC', size: 6, dimensions: false}
  ],
  'mode-1': [
    {title: 'ARCADE', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'АРКАДА', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'mode-2': [
    {title: 'SURVIVAL', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ВЫЖИВАНИЕ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'play': [
    {title: 'PLAY', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ИГРАТЬ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'store': [
    {title: 'STORE', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'МАГАЗИН', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'rate': [
    {title: 'RATE', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ГОЛОС', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'more': [
    {title: 'MORE', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'БОЛЬШЕ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'menu': [
    {title: 'MENU', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'МЕНЮ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'scores': [
    {title: 'SCORES', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'РЕЙТИНГ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'back': [
    {title: 'BACK', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'НАЗАД', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'sound-on': [
    {title: 'SOUND ON', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ЗВУКИ ВКЛ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'sound-off': [
    {title: 'SOUND OFF', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ЗВУКИ ВЫКЛ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'vibrate-on': [
    {title: 'VIBRATE ON', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ВИБРО ВКЛ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'vibrate-off': [
    {title: 'VIBRATE OFF', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ВИБРО ВЫКЛ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'language-en': [
    {title: 'ENGLISH', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ENGLISH', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'language-ru': [
    {title: 'РУССКИЙ', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'РУССКИЙ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'settings': [
    {title: 'SETTINGS', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'НАСТРОЙКИ', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'single': [
    {title: 'SINGLE', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ОДИН', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'online': [
    {title: 'ONLINE', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ОНЛАЙН', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'next': [
    {title: 'NEXT', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'СЛЕД', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'previous': [
    {title: 'PREV', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ПРЕД', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'description': [
    {title: 'This game "Over Road: destroy your car" was created to showcase the work of Tooflya API (http://api.tooflya.com).\n\nThis game has no commercial purpose. All integrated in-app purchases are presented to study the mechanisms of libraries work.', font: 'RetroVille NC', size: 6, dimensions: [65, 0]},
    {title: 'Игра "Вне дороги: уничтожь машину" была создана для демонстрации работы Tooflya API (http://api.tooflya.com).\n\nИгра не имеет никакого коммерческого предназначения. Все интегрированные внутриигровые покупки представлены для ознакомления с механизмами работы библиотек.', font: 'RetroVille NC', size: 6, dimensions: [65, 0]}
  ],
  'tap-to-ready': [
    {title: 'TAP WHEN\nYOU\'RE READY', font: 'RetroVille NC', size: 12, dimensions: false},
    {title: 'Коснитесь\nдля начала', font: 'RetroVille NC', size: 12, dimensions: false}
  ],
  'counter': [
    {title: '$1', font: 'RetroVille NC', size: 18, dimensions: false},
    {title: '$1', font: 'RetroVille NC', size: 18, dimensions: false}
  ],
  'car-0': [
    {title: 'Regular car. Has no special properties. Quite often breaks.', font: 'RetroVille NC', size: 5, dimensions: [115, 32]},
    {title: 'Обычная машина. Не обладает специальными свойствами. Довольно часто ломается.', font: 'RetroVille NC', size: 5, dimensions: [115, 32]}
  ],
  'car-1': [
    {title: 'Army vehicle. Moves confidently. Remains intact after two collisions.', font: 'RetroVille NC', size: 5, dimensions: [115, 32]},
    {title: 'Армейская машина. Движется уверенно. Остается цела после двух столкновений.', font: 'RetroVille NC', size: 5, dimensions: [115, 32]}
  ],
  'car-2': [
    {title: 'Police car. Campaigners try to skip it.', font: 'RetroVille NC', size: 5, dimensions: [115, 32]},
    {title: 'Полицейская машина. Участники движения стараются пропустить ее.', font: 'RetroVille NC', size: 5, dimensions: [115, 32]}
  ],
  'buy-car-1': [
    {title: 'BUY, $2.99', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'КУПИТЬ, $2.99', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'buy-car-2': [
    {title: 'BUY, $6.99', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'КУПИТЬ, $6.99', font: 'RetroVille NC', size: 5, dimensions: false}
  ],
  'choose': [
    {title: 'TAKE IT', font: 'RetroVille NC', size: 5, dimensions: false},
    {title: 'ВЫБРАТЬ', font: 'RetroVille NC', size: 5, dimensions: false}
  ]
};
