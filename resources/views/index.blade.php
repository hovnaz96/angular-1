<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Csrf token --}}
    <meta name="csrf-token" content="{{ csrf_token() }}"/>

    <title>Angular APP</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>

<body ng-app="app">

<section ui-view></section>

{{-- Scripts --}}
<script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
<script type="text/javascript" src="{{ asset('build/angular.js') }}"></script>
<script type="text/javascript" src="{{ asset('build/app.js') }}"></script>
{{-- Scripts End --}}

</body>
</html>