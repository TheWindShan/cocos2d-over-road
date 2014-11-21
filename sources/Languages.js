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
    {title: 'FPS: $1', font: 'Molot', size: 6, dimensions: false},
    {title: 'FPS: $1', font: 'Molot', size: 6, dimensions: false}
  ],
  'loading-1': [
    {title: 'Loading textures: $1 from $2', font: 'Molot', size: 6, dimensions: false},
    {title: 'Загрузка ресурсов: $1 из $2', font: 'Molot', size: 6, dimensions: false}
  ],
  'loading-2': [
    {title: 'Checking updates.', font: 'Molot', size: 6, dimensions: false},
    {title: 'Проверка обновлений.', font: 'Molot', size: 6, dimensions: false}
  ],
  'loading-3': [
    {title: 'Verify account.', font: 'Molot', size: 6, dimensions: false},
    {title: 'Проверка информации.', font: 'Molot', size: 6, dimensions: false}
  ],
  'loading-4': [
    {title: 'Connecting to the server.', font: 'Molot', size: 6, dimensions: false},
    {title: 'Подключение к серверу.', font: 'Molot', size: 6, dimensions: false}
  ],
  'update-error-1': [
    {title: 'Update error: package broken.', font: 'Molot', size: 6, dimensions: false},
    {title: 'Ошибка: приложение повреждено.', font: 'Molot', size: 6, dimensions: false}
  ],
  'update-error-2': [
    {title: 'Update error: network broken.\nLet\'s try again.', font: 'Molot', size: 6, dimensions: false},
    {title: 'Ошибка загрузки: пробуем еще раз.', font: 'Molot', size: 6, dimensions: false}
  ],
  'update-error-3': [
    {title: 'Update error: network corrupted.', font: 'Molot', size: 6, dimensions: false},
    {title: 'Ошибка загрузки: проблемы с сетью.', font: 'Molot', size: 6, dimensions: false}
  ],
  'update-progress-1': [
    {title: 'Update in progress...', font: 'Molot', size: 6, dimensions: false},
    {title: 'Ожидание обновления.', font: 'Molot', size: 6, dimensions: false}
  ],
  'update-complete': [
    {title: 'Update successfully completed.', font: 'Molot', size: 6, dimensions: false},
    {title: 'Обновление успешно завершено.', font: 'Molot', size: 6, dimensions: false}
  ],
  'update-finish': [
    {title: 'Laters version installed.', font: 'Molot', size: 6, dimensions: false},
    {title: 'Установлена последняя версия.', font: 'Molot', size: 6, dimensions: false}
  ],
  'mode-1': [
    {title: 'ARCADE', font: 'Molot', size: 6, dimensions: false},
    {title: 'АРКАДА', font: 'Molot', size: 6, dimensions: false}
  ],
  'mode-2': [
    {title: 'SURVIVAL', font: 'Molot', size: 6, dimensions: false},
    {title: 'ВЫЖИВАНИЕ', font: 'Molot', size: 6, dimensions: false}
  ],
  'play': [
    {title: 'PLAY', font: 'Molot', size: 6, dimensions: false},
    {title: 'ИГРАТЬ', font: 'Molot', size: 6, dimensions: false}
  ],
  'retry': [
    {title: 'RETRY', font: 'Molot', size: 6, dimensions: false},
    {title: 'ПОВТОРИТЬ', font: 'Molot', size: 6, dimensions: false}
  ],
  'store': [
    {title: 'STORE', font: 'Molot', size: 6, dimensions: false},
    {title: 'МАГАЗИН', font: 'Molot', size: 6, dimensions: false}
  ],
  'rate': [
    {title: 'RATE', font: 'Molot', size: 6, dimensions: false},
    {title: 'ГОЛОС', font: 'Molot', size: 6, dimensions: false}
  ],
  'more': [
    {title: 'MORE', font: 'Molot', size: 6, dimensions: false},
    {title: 'БОЛЬШЕ', font: 'Molot', size: 6, dimensions: false}
  ],
  'menu': [
    {title: 'MENU', font: 'Molot', size: 6, dimensions: false},
    {title: 'МЕНЮ', font: 'Molot', size: 6, dimensions: false}
  ],
  'scores': [
    {title: 'SCORES', font: 'Molot', size: 6, dimensions: false},
    {title: 'РЕЙТИНГ', font: 'Molot', size: 6, dimensions: false}
  ],
  'back': [
    {title: 'BACK', font: 'Molot', size: 6, dimensions: false},
    {title: 'НАЗАД', font: 'Molot', size: 6, dimensions: false}
  ],
  'sound-on': [
    {title: 'SOUND ON', font: 'Molot', size: 6, dimensions: false},
    {title: 'ЗВУКИ ВКЛ', font: 'Molot', size: 6, dimensions: false}
  ],
  'sound-off': [
    {title: 'SOUND OFF', font: 'Molot', size: 6, dimensions: false},
    {title: 'ЗВУКИ ВЫКЛ', font: 'Molot', size: 6, dimensions: false}
  ],
  'vibrate-on': [
    {title: 'VIBRATE ON', font: 'Molot', size: 6, dimensions: false},
    {title: 'ВИБРО ВКЛ', font: 'Molot', size: 6, dimensions: false}
  ],
  'vibrate-off': [
    {title: 'VIBRATE OFF', font: 'Molot', size: 6, dimensions: false},
    {title: 'ВИБРО ВЫКЛ', font: 'Molot', size: 6, dimensions: false}
  ],
  'language-en': [
    {title: 'ENGLISH', font: 'Molot', size: 6, dimensions: false},
    {title: 'ENGLISH', font: 'Molot', size: 6, dimensions: false}
  ],
  'language-ru': [
    {title: 'РУССКИЙ', font: 'Molot', size: 6, dimensions: false},
    {title: 'РУССКИЙ', font: 'Molot', size: 6, dimensions: false}
  ],
  'settings': [
    {title: 'SETTINGS', font: 'Molot', size: 6, dimensions: false},
    {title: 'НАСТРОЙКИ', font: 'Molot', size: 6, dimensions: false}
  ],
  'single': [
    {title: 'SINGLE', font: 'Molot', size: 6, dimensions: false},
    {title: 'ОДИН', font: 'Molot', size: 6, dimensions: false}
  ],
  'online': [
    {title: 'ONLINE', font: 'Molot', size: 6, dimensions: false},
    {title: 'ОНЛАЙН', font: 'Molot', size: 6, dimensions: false}
  ],
  'next': [
    {title: 'NEXT', font: 'Molot', size: 6, dimensions: false},
    {title: 'СЛЕД', font: 'Molot', size: 6, dimensions: false}
  ],
  'previous': [
    {title: 'PREV', font: 'Molot', size: 6, dimensions: false},
    {title: 'ПРЕД', font: 'Molot', size: 6, dimensions: false}
  ],
  'description': [
    {title: 'This game "Over Road: destroy your car" was created to showcase the work of Tooflya API (http://api.tooflya.com).\n\nThis game has no commercial purpose. All integrated in-app purchases are presented to study the mechanisms of libraries work.', font: 'Molot', size: 3, dimensions: [65, 0]},
    {title: 'Игра "Вне дороги: уничтожь машину" была создана для демонстрации работы Tooflya API (http://api.tooflya.com).\n\nИгра не имеет никакого коммерческого предназначения. Все интегрированные внутриигровые покупки представлены для ознакомления с механизмами работы библиотек.', font: 'Molot', size: 3, dimensions: [65, 0]}
  ],
  'tap-to-ready': [
    {title: 'TAP WHEN\nYOU\'RE READY', font: 'Molot', size: 10, dimensions: false},
    {title: 'Коснитесь\nдля начала', font: 'Molot', size: 10, dimensions: false}
  ],
  'counter': [
    {title: '$1', font: 'Molot', size: 16, dimensions: false},
    {title: '$1', font: 'Molot', size: 16, dimensions: false}
  ],
  'car-0': [
    {title: 'Regular car.\nHas no special properties.', font: 'Molot', size: 6, dimensions: [50, 32]},
    {title: 'Обычная машина.\nНе обладает специальными свойствами.', font: 'Molot', size: 6, dimensions: [50, 32]}
  ],
  'car-1': [
    {title: 'Army vehicle.\nMoves confidently. Remains intact after two collisions.', font: 'Molot', size: 6, dimensions: [50, 32]},
    {title: 'Армейская машина.\nДвижется уверенно. Остается цела после двух столкновений.', font: 'Molot', size: 6, dimensions: [50, 32]}
  ],
  'car-2': [
    {title: 'Police car.\nCampaigners try to skip it.', font: 'Molot', size: 6, dimensions: [50, 32]},
    {title: 'Полицейская машина.\nУчастники движения стараются пропустить ее.', font: 'Molot', size: 6, dimensions: [50, 32]}
  ],
  'buy-car-1': [
    {title: 'BUY, $2.99', font: 'Molot', size: 6, dimensions: false},
    {title: 'КУПИТЬ, $2.99', font: 'Molot', size: 6, dimensions: false}
  ],
  'buy-car-2': [
    {title: 'BUY, $6.99', font: 'Molot', size: 6, dimensions: false},
    {title: 'КУПИТЬ, $6.99', font: 'Molot', size: 6, dimensions: false}
  ],
  'choose': [
    {title: 'TAKE IT', font: 'Molot', size: 6, dimensions: false},
    {title: 'ВЫБРАТЬ', font: 'Molot', size: 6, dimensions: false}
  ],
  'facebook-sign': [
    {title: 'Please sign in with Facebook to play with friends!', font: 'Molot', size: 6, dimensions: [40, 32]},
    {title: 'Пожалуйста войдите через Facebook чтобы играть с друзьями!', font: 'Molot', size: 6, dimensions: [40, 32]}
  ],
  'best-score-title': [
    {title: 'BEST', font: 'Molot', size: 10, dimensions: false},
    {title: 'ЛУЧШИЙ', font: 'Molot', size: 10, dimensions: false}
  ],
  'current-score-title': [
    {title: 'SCORE', font: 'Molot', size: 10, dimensions: false},
    {title: 'ОЧКИ', font: 'Molot', size: 10, dimensions: false}
  ],
  'best-score': [
    {title: '$1', font: 'Molot', size: 8, dimensions: false},
    {title: '$1', font: 'Molot', size: 8, dimensions: false}
  ],
  'current-score': [
    {title: '$1', font: 'Molot', size: 8, dimensions: false},
    {title: '$1', font: 'Molot', size: 8, dimensions: false}
  ],
  'echo-1': [
    {title: 'Player: $1 $2', font: 'Molot', size: 4, dimensions: false},
    {title: '$1 $2', font: 'Molot', size: 4, dimensions: false}
  ],
  'echo-2': [
    {title: 'Points: $1', font: 'Molot', size: 2, dimensions: false},
    {title: 'Очков: $1', font: 'Molot', size: 2, dimensions: false}
  ],
  'random': [
    {title: 'RANDOM', font: 'Molot', size: 3, dimensions: false},
    {title: 'СЛУЧАЙНЫЙ', font: 'Molot', size: 3, dimensions: false}
  ],
  'view-1': [
    {title: '$1 $2', font: 'Molot', size: 2, dimensions: false},
    {title: '$1 $2', font: 'Molot', size: 2, dimensions: false}
  ],
  'view-2': [
    {title: 'ONLINE', font: 'Molot', size: 2, dimensions: false},
    {title: 'ОНЛАЙН', font: 'Molot', size: 2, dimensions: false}
  ],
  'view-3': [
    {title: 'OFFLINE', font: 'Molot', size: 2, dimensions: false},
    {title: 'ОФФЛАЙН', font: 'Molot', size: 2, dimensions: false}
  ]
};
