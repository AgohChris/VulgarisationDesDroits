<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Liste des Glossaires</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/9179c9d0f1.js" crossorigin="anonymous"></script>
  </head>
  <body>
    <div class="container-fluid">
        <div class="content mt-5 mb-4">
            <h1 class="text-center text-primary mb-4">GLOSSAIRES DISPONIBLES</h1>
            <hr>

            <!-- Actions -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <a href="/ajout" class="btn btn-outline-dark">Ajouter un terme</a>
                <a href="/tableau" class="btn btn-outline-secondary">Dashboard</a>
            </div>

            <!-- Messages session -->
            @if(session('suppression'))
                <div class="alert alert-success">{{ session('suppression') }}</div>
            @endif

            @if(session('ajout'))
                <div class="alert alert-success">{{ session('ajout') }}</div>
            @endif
            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif
            @if(session('error'))
                <div class="alert alert-danger">{{ session('error') }}</div>
            @endif
            @if(session('supprimer'))
                <div class="alert alert-danger">{{ session('supprimer') }}</div>
            @endif
            @if(session('modifier'))
                <div class="alert alert-info">{{ session('modifier') }}</div>
            @endif

            <!-- Tableau des glossaires -->
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>Numéro</th>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Exemple</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php $num = 1; @endphp
                        @foreach($glossaires as $glossaire)
                        <tr>
                            <td>{{ $num++ }}</td>
                            <td>{{ $glossaire->titre }}</td>
                            <td>{{ $glossaire->description }}</td>
                            <td>{{ $glossaire->exemple }}</td>
                            <td class="text-center">
                                <div class="d-flex justify-content-start gap-2">
                                    <!-- Modifier -->
                                    <a href="/glossaire/modifier/{{ $glossaire->id }}" class="btn btn-primary btn-sm">
                                        <i class="fas fa-edit"></i> Modifier
                                    </a>

                                    <!-- Supprimer -->
                                    <a href="/glossaire/supprimer/{{ $glossaire->id }}" class="btn btn-danger btn-sm" onclick="return confirm('Confirmer la suppression ?')">
                                        <i class="fas fa-trash-alt"></i> Supprimer
                                    </a>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>

  <style>
    body {
        font-family: 'Verdana', sans-serif;
        background-color: #e9ecef;
    }

    .content {
        background-color: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .content h1 {
        font-family: 'Georgia', serif;
        font-size: 32px;
        font-weight: bold;
        color: #0056b3;
    }

    .content .btn {
        font-size: 14px;
        padding: 8px 15px;
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    .content .btn-outline-dark {
        border-color: #343a40;
        color: #343a40;
    }

    .content .btn-outline-dark:hover {
        background-color: #343a40;
        color: #fff;
    }

    .content .btn-outline-secondary {
        border-color: #6c757d;
        color: #6c757d;
    }

    .content .btn-outline-secondary:hover {
        background-color: #6c757d;
        color: #fff;
    }

    .content .btn-primary {
        background-color: #007bff;
        border: 1px solid #007bff;
    }

    .content .btn-primary:hover {
        background-color: #0056b3;
    }

    .content .btn-danger {
        background-color: #dc3545;
        border: 1px solid #dc3545;
    }

    .content .btn-danger:hover {
        background-color: #c82333;
    }

    .table th, .table td {
        padding: 12px;
        text-align: left;
        font-size: 14px;
    }

    .table th {
        background-color: #007bff;
        color: white;
    }

    .table tbody tr:nth-child(even) {
        background-color: #f1f1f1;
    }

    .table tbody tr:hover {
        background-color: #f5f5f5;
    }

    .table-responsive {
        max-height: 500px;
        overflow-y: auto;
    }

    @media (max-width: 768px) {
        .content {
            padding: 20px;
        }

        .content h1 {
            font-size: 28px;
        }

        .table th, .table td {
            font-size: 12px;
        }

        .content .btn {
            font-size: 12px;
            padding: 6px 12px;
        }
    }
  </style>
</html>
