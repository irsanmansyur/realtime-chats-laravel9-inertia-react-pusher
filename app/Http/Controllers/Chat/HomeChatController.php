<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeChatController extends Controller
{
    public function index()
    {
        Inertia::setRootView("chats");
    }
}
