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
  'loading-1': [
    {title: 'Loading textures: $1 from $2', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Загрузка ресурсов: $1 из $2', font: 'Retroville', size: 6, dimensions: false}
  ],
  'loading-2': [
    {title: 'Checking updates.', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Проверка обновлений.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'loading-3': [
    {title: 'Verify account.', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Проверка информации.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'loading-4': [
    {title: 'Connecting to the server.', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Подключение к серверу.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'update-error-1': [
    {title: 'Update error: package broken.', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Ошибка: приложение повреждено.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'update-error-2': [
    {title: 'Update error: network broken.\nLet\'s try again.', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Ошибка загрузки: пробуем еще раз.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'update-error-3': [
    {title: 'Update error: network corrupted.', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Ошибка загрузки: проблемы с сетью.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'update-progress-1': [
    {title: 'Update in progress...', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Ожидание обновления.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'update-complete': [
    {title: 'Update successfully completed.', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Обновление успешно завершено.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'update-finish': [
    {title: 'Laters version installed.', font: 'Retroville', size: 6, dimensions: false},
    {title: 'Установлена последняя версия.', font: 'Retroville', size: 6, dimensions: false}
  ],
  'mode-1': [
    {title: 'ARCADE', font: 'Retroville', size: 5, dimensions: false},
    {title: 'АРКАДА', font: 'Retroville', size: 5, dimensions: false}
  ],
  'mode-2': [
    {title: 'SURVIVAL', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ВЫЖИВАНИЕ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'play': [
    {title: 'PLAY', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ИГРАТЬ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'store': [
    {title: 'STORE', font: 'Retroville', size: 5, dimensions: false},
    {title: 'МАГАЗИН', font: 'Retroville', size: 5, dimensions: false}
  ],
  'rate': [
    {title: 'RATE', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ГОЛОС', font: 'Retroville', size: 5, dimensions: false}
  ],
  'more': [
    {title: 'MORE', font: 'Retroville', size: 5, dimensions: false},
    {title: 'БОЛЬШЕ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'menu': [
    {title: 'MENU', font: 'Retroville', size: 5, dimensions: false},
    {title: 'МЕНЮ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'scores': [
    {title: 'SCORES', font: 'Retroville', size: 5, dimensions: false},
    {title: 'РЕЙТИНГ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'back': [
    {title: 'BACK', font: 'Retroville', size: 5, dimensions: false},
    {title: 'НАЗАД', font: 'Retroville', size: 5, dimensions: false}
  ],
  'sound-on': [
    {title: 'SOUND ON', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ЗВУКИ ВКЛ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'sound-off': [
    {title: 'SOUND OFF', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ЗВУКИ ВЫКЛ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'vibrate-on': [
    {title: 'VIBRATE ON', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ВИБРО ВКЛ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'vibrate-off': [
    {title: 'VIBRATE OFF', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ВИБРО ВЫКЛ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'language-en': [
    {title: 'ENGLISH', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ENGLISH', font: 'Retroville', size: 5, dimensions: false}
  ],
  'language-ru': [
    {title: 'РУССКИЙ', font: 'Retroville', size: 5, dimensions: false},
    {title: 'РУССКИЙ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'settings': [
    {title: 'SETTINGS', font: 'Retroville', size: 5, dimensions: false},
    {title: 'НАСТРОЙКИ', font: 'Retroville', size: 5, dimensions: false}
  ],
  'single': [
    {title: 'SINGLE', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ОДИН', font: 'Retroville', size: 5, dimensions: false}
  ],
  'online': [
    {title: 'ONLINE', font: 'Retroville', size: 5, dimensions: false},
    {title: 'ОНЛАЙН', font: 'Retroville', size: 5, dimensions: false}
  ],
  'description': [
    {title: 'This game "Over Road: destroy your car" was created to showcase the work of Tooflya API (http://api.tooflya.com).\n\nThis game has no commercial purpose. All integrated in-app purchases are presented to study the mechanisms of libraries work.', font: 'Retroville', size: 6, dimensions: [65, 0]},
    {title: 'Игра "Вне дороги: уничтожь машину" была создана для демонстрации работы Tooflya API (http://api.tooflya.com).\n\nИгра не имеет никакого коммерческого предназначения. Все интегрированные внутриигровые покупки представлены для ознакомления с механизмами работы библиотек.', font: 'Retroville', size: 6, dimensions: [65, 0]}
  ],
  'tap-to-ready': [
    {title: 'TAP WHEN\nYOU\'RE READY', font: 'Retroville', size: 12, dimensions: false},
    {title: 'Коснитесь\nдля начала', font: 'Retroville', size: 12, dimensions: false}
  ],
  'counter': [
    {title: '$1', font: 'Retroville', size: 18, dimensions: false},
    {title: '$1', font: 'Retroville', size: 18, dimensions: false}
  ]
};
