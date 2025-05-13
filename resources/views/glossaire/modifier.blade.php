<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modifier un Terme</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5 mb-5">
        <div class="card shadow-lg p-4">
            <h2 class="text-center text-primary mb-4">MODIFIER UN TERME DU GLOSSAIRE</h2>

            <!-- Message d'erreur -->
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- Formulaire -->
            <form action="/glossaire/modifier/{{ $glossaire->id }}" method="POST">
                @csrf

                <div class="mb-3">
                    <label for="titre" class="form-label">Titre</label>
                    <input type="text" class="form-control" name="titre" id="titre" value="{{ old('titre', $glossaire->titre) }}" required>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" name="description" id="description" rows="3" required>{{ old('description', $glossaire->description) }}</textarea>
                </div>

                <div class="mb-3">
                    <label for="exemple" class="form-label">Exemple</label>
                    <textarea class="form-control" name="exemple" id="exemple" rows="3" required>{{ old('exemple', $glossaire->exemple) }}</textarea>
                </div>

                <div class="d-flex justify-content-between">
                    <a href="/liste/glossaire" class="btn btn-secondary">Annuler</a>
                    <button type="submit" class="btn btn-primary">Mettre à jour</button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
