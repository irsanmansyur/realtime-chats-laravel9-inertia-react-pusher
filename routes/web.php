<?php

use App\Http\Controllers\Chat\HomeChatController;
use App\Http\Controllers\Dashboard\BaseDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware("auth")->group(function () {
    Route::get('/', [HomeChatController::class, "index"])->name("chats");
    Route::get('/get-messages/{to_user}', [HomeChatController::class, "getMessages"])->name('chats.user');
    Route::post('/get-messages-more/{to_user}', [HomeChatController::class, "loadMore"])->name('chats.user.more');
    Route::post('/send-message/{to_user}', [HomeChatController::class, "sendMessages"])->name('chats.sending');
    Route::get('/send-notif-istyping-to-/{to_user}', [HomeChatController::class, "sendNotifIsTyping"])->name('chats.sending');
    Route::get('/test', [HomeChatController::class, "test"]);
});

Route::get('/dashboard', [BaseDashboardController::class, "index"])->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
require __DIR__ . '/base_routes.php';
