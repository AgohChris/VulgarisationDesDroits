Watching for file changes with StatReloader
Performing system checks...

Fichier ChatbotAi/juriste_data.json chargé avec succès.
Fichier nettoyé et sauvegardé sous : ChatbotAi/juriste_data_nettoyer.json
System check identified no issues (0 silenced).
May 31, 2025 - 19:52:06
Django version 5.2.1, using settings 'VulgBack.settings'
Starting development server at http://127.0.0.1:8080/
Quit the server with CONTROL-C.

WARNING: This is a development server. Do not use it in a production setting. Use a production WSGI or ASGI server instead.
For more information on production servers see: https://docs.djangoproject.com/en/5.2/howto/deployment/
[31/May/2025 19:53:09] "GET /api/chatbot/interactions/count/ HTTP/1.1" 200 24
[31/May/2025 19:53:09] "GET /api/chatbot/interactions/count/ HTTP/1.1" 200 24
[31/May/2025 19:53:09] "GET /api/chatbot/interactions/count/ HTTP/1.1" 200 24
[31/May/2025 19:53:09] "GET /api/chatbot/interactions/count/ HTTP/1.1" 200 24
[31/May/2025 19:53:09] "GET /api/chats/liste/ HTTP/1.1" 200 35502
[31/May/2025 19:53:09] "GET /api/chats/liste/ HTTP/1.1" 200 35502
[31/May/2025 19:53:10] "GET /api/chats/liste/ HTTP/1.1" 200 35502
[31/May/2025 19:53:10] "GET /api/chats/liste/ HTTP/1.1" 200 35502
[31/May/2025 19:53:11] "GET /api/newsletter/abonnee/count/ HTTP/1.1" 200 22
[31/May/2025 19:53:11] "GET /api/newsletter/abonnee/count/ HTTP/1.1" 200 22
[31/May/2025 19:53:11] "GET /api/newsletter/abonnee/count/ HTTP/1.1" 200 22
[31/May/2025 19:53:11] "GET /api/newsletter/abonnee/count/ HTTP/1.1" 200 22
[31/May/2025 20:13:00] "GET /api/ressources/liste HTTP/1.1" 200 457
[31/May/2025 20:13:00] "GET /api/ressources/liste HTTP/1.1" 200 457
[31/May/2025 20:13:00] "GET /api/ressources/liste HTTP/1.1" 200 457
[31/May/2025 20:13:00] "GET /api/ressources/liste HTTP/1.1" 200 457
[31/May/2025 20:13:09] "GET /api/ressources/liste HTTP/1.1" 200 457
[31/May/2025 20:13:09] "GET /api/ressources/liste HTTP/1.1" 200 457
Internal Server Error: /api/ressources/liste/type/guide
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeGuide.get() missing 1 required positional argument: 'type'
[31/May/2025 20:14:57] "GET /api/ressources/liste/type/guide HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/guide
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeGuide.get() missing 1 required positional argument: 'type'
[31/May/2025 20:14:57] "GET /api/ressources/liste/type/guide HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/guide
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeGuide.get() missing 1 required positional argument: 'type'
[31/May/2025 20:15:16] "GET /api/ressources/liste/type/guide HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/guide
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeGuide.get() missing 1 required positional argument: 'type'
[31/May/2025 20:15:17] "GET /api/ressources/liste/type/guide HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/guide
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeGuide.get() missing 1 required positional argument: 'type'
[31/May/2025 20:15:18] "GET /api/ressources/liste/type/guide HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/guide
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeGuide.get() missing 1 required positional argument: 'type'
[31/May/2025 20:15:18] "GET /api/ressources/liste/type/guide HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:15:44] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:15:44] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:15:47] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:15:48] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:02] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:02] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:04] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:04] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:07] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/podcast
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypePodcast.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:08] "GET /api/ressources/liste/type/podcast HTTP/1.1" 500 85277
Internal Server Error: /api/ressources/liste/type/guide
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeGuide.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:15] "GET /api/ressources/liste/type/guide HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/guide
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeGuide.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:15] "GET /api/ressources/liste/type/guide HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/video
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeVideo.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:22] "GET /api/ressources/liste/type/video HTTP/1.1" 500 85211
Internal Server Error: /api/ressources/liste/type/video
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
TypeError: RessourceListeTypeVideo.get() missing 1 required positional argument: 'type'
[31/May/2025 20:16:22] "GET /api/ressources/liste/type/video HTTP/1.1" 500 85211
[31/May/2025 20:17:11] "OPTIONS /api/ressources/ajouts HTTP/1.1" 200 0
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:11] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:13] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:13] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:14] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:14] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:14] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:15] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:18] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:19] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:19] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:17:46] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:20:23] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:21:10] "POST /api/ressources/ajouts HTTP/1.1" 400 40
Bad Request: /api/ressources/ajouts
[31/May/2025 20:21:15] "POST /api/ressources/ajouts HTTP/1.1" 400 40
[31/May/2025 20:24:05] "OPTIONS /api/ressources/2/update HTTP/1.1" 200 0
Internal Server Error: /api/ressources/2/update
Traceback (most recent call last):
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/core/handlers/base.py", line 197, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/django/views/generic/base.py", line 104, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/Users/py/Dev/VulgFulls/VulgBack/log/lib/python3.13/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
  File "/Users/py/Dev/VulgFulls/VulgBack/ChatbotAi/views.py", line 244, in put
    return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
                    ^^^^^^^^^^^^^^^^
AttributeError: 'RessourceSerializer' object has no attribute 'erros'. Did you mean: 'errors'?
[31/May/2025 20:24:06] "PUT /api/ressources/2/update HTTP/1.1" 500 90402
[31/May/2025 20:24:37] "OPTIONS /api/ressources/1/delete HTTP/1.1" 200 0
Not Found: /api/ressources/1/delete
[31/May/2025 20:24:37] "DELETE /api/ressources/1/delete HTTP/1.1" 404 33
[31/May/2025 20:24:42] "OPTIONS /api/ressources/2/delete HTTP/1.1" 200 0
Not Found: /api/ressources/2/delete
[31/May/2025 20:24:42] "DELETE /api/ressources/2/delete HTTP/1.1" 404 33
