<?php

namespace App\Http\Controllers\Chat;

use App\Events\IsPeoplesTypingMessage;
use App\Events\SendMessageToUser;
use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserChatResource;
use App\Http\Traits\MessageTrait;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeChatController extends Controller
{
    use MessageTrait;
    public function index()
    {
        $peoples = User::whereNotIn("id", [user('id')])->get();
        return Inertia::render("chat/Home", [
            "peoples" => UserChatResource::collection($peoples)
        ]);
    }
    public function loadMore(Request $request, User $to_user)
    {
        $messages = Message::whereNotIn("id", $request->messages_id ?? [])->where(function ($q) use ($to_user) {
            $q->where(function ($w) use ($to_user) {
                $w->whereUserId(user('id'))->whereTo($to_user->id);
            })->orWhere(function ($w) use ($to_user) {
                $w->whereUserId($to_user->id)->whereTo(user('id'));
            });
        })->with(["from_user:id,name,thumbnail", "to_user:id,name,thumbnail"])->latest()->paginate(20);
        if ($request->wantsJson())
            return MessageResource::collection($messages);
    }
    public function getMessages(User $to_user, Request $request)
    {
        $this->messageSetTelahDibaca($to_user);

        $meggases = Message::where(function ($w) use ($to_user) {
            $w->whereUserId(user('id'))->whereTo($to_user->id);
        })->orWhere(function ($w) use ($to_user) {
            $w->whereUserId($to_user->id)->whereTo(user('id'));
        })->with(["from_user:id,name,thumbnail", "to_user:id,name,thumbnail"])->latest()->paginate(20);

        if ($request->wantsJson())
            return MessageResource::collection($meggases);
    }
    public function sendMessages(User $to_user, Request $request)
    {
        $message = Message::create([
            "user_id" => user('id'),
            "to" => $to_user->id,
            "content" => $request->content
        ]);
        $messageResource = new MessageResource($message);
        SendMessageToUser::dispatch($messageResource);
        if ($request->wantsJson())
            return $messageResource;
    }
    public function sendNotifIsTyping(User $to_user, Request $request)
    {
        IsPeoplesTypingMessage::broadcast($to_user);
        return $to_user;
    }
    public function test()
    {
        Inertia::setRootView("chats");
        return Inertia::render("chat/Test", []);
    }
}
