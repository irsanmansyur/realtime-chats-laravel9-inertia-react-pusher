<?php

namespace App\Http\Traits;

use App\Models\Message;

trait MessageTrait
{
    public function messageSetTelahDibaca($to_user)
    {
        Message::where(function ($w) use ($to_user) {
            $w->whereUserId(user('id'))->whereTo($to_user->id);
        })->orWhere(function ($w) use ($to_user) {
            $w->whereUserId($to_user->id)->whereTo(user('id'));
        })->update(["status" => config("chats.chat.DIBACA")]);
    }
}
