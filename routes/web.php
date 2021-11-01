<?php
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('evento.index');
})->middleware("auth");

Auth::routes();

Route::group(['middleware' => ['auth']], function(){

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/evento', [App\Http\Controllers\EventoController::class, 'index']);
    Route::post('/evento/mostrar', [App\Http\Controllers\EventoController::class, 'show']);
    Route::post('/evento/adicionar', [App\Http\Controllers\EventoController::class, 'store']);
    Route::post('/evento/editar/{id}', [App\Http\Controllers\EventoController::class, 'edit']);
    Route::post('/evento/atualizar/{evento}', [App\Http\Controllers\EventoController::class, 'update']);
    Route::post('/evento/remover/{id}', [App\Http\Controllers\EventoController::class, 'destroy']);

});
