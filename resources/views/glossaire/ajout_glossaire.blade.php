<!DOCTYPE html>
<html>
<head>
    <title>Ajout Glossaire</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <h1>Ajouter un nouveau terme au glossaire</h1>

    @if (session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    @if ($errors->any())
        <div style="color: red;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ url('/glossaire') }}" method="POST">
        @csrf
        <label for="titre">Titre :</label><br>
        <input type="text" id="titre" name="titre"><br><br>

        <label for="description">Description :</label><br>
        <textarea id="description" name="description"></textarea><br><br>

        <label for="exemple">Exemple :</label><br>
        <textarea id="exemple" name="exemple"></textarea><br><br>

        <button type="submit">Ajouter</button>
    </form>

    <br>
    <br>

    <a href="/liste/glossaire">LISTE</a>
</body>
</html>
